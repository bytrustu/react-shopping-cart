import { useEffect, useState } from 'react';
import { useInitializeCarts } from '@/queries';

export const useLocalCartIds = () => {
  const initializeCarts = useInitializeCarts();
  const [localCartIds, setLocalCartIds] = useState<number[]>([]);

  useEffect(() => {
    initializeCarts.set();
  }, []);

  return {
    value: localCartIds,
    set: setLocalCartIds,
  };
};
