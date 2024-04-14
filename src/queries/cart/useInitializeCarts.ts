import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queries';
import { http, localStorageUtil } from '@/utils';

export const useInitializeCarts = () => {
  const queryClient = useQueryClient();

  const { mutate: initializeCarts } = useMutation({
    mutationFn: (cartIds: number[]) => http.post<number[]>('/carts', cartIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CARTS(),
      });
    },
  });

  const initializeCartFromLocalStorage = () => {
    const savedCartIds = localStorageUtil.getItem<number[]>('carts') ?? [];
    if (savedCartIds.length > 0) {
      initializeCarts(savedCartIds);
    }
  };

  return {
    set: initializeCartFromLocalStorage,
  };
};
