import { useEffect } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

const mergeLocalAndServerData = <T>(localData: T[], serverData: T[], getKey: (item: T) => string | number): T[] => {
  const localDataMap = new Map(localData.map((item) => [getKey(item), item]));

  const mergedData =
    serverData.length > 0
      ? serverData.reduce<T[]>((merged, serverItem) => {
          const localItem = localDataMap.get(getKey(serverItem));
          if (localItem) {
            localDataMap.delete(getKey(serverItem));
            return [...merged, localItem];
          }
          return [...merged, serverItem];
        }, [])
      : [];

  const additionalLocalData = Array.from(localDataMap.values());
  return [...mergedData, ...additionalLocalData];
};

export const useSync = <T>(options: {
  localStorageKey: string;
  serverQuery: UseQueryResult<T[], unknown>;
  getLocalStorageData: () => { state: { data: T[] } } | null;
  setData: (data: T[]) => void;
  getKey: (item: T) => string | number;
  updateServer?: (data: T[]) => Promise<void>;
}) => {
  const { localStorageKey, serverQuery, getLocalStorageData, setData, getKey, updateServer } = options;

  useEffect(() => {
    try {
      const localStorageData = getLocalStorageData();
      const serverData = serverQuery.data || [];
      const localData = localStorageData?.state.data || [];

      const mergedData = mergeLocalAndServerData(localData, serverData, getKey);
      setData(mergedData);
    } catch (error) {
      console.error(`useSync useEffect Error for ${localStorageKey}:`, error);
    }
  }, [serverQuery.data]);

  const handleUpdateServer = async () => {
    if (updateServer) {
      const localStorageData = getLocalStorageData();
      const localData = localStorageData?.state.data || [];
      await updateServer(localData);
    }
  };

  return { update: handleUpdateServer };
};
