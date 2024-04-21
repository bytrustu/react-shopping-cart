import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queries';
import { Product } from '@/types';
import { http } from '@/utils';

type UseUpdateProductLikesMutation = {
  onMutate?: () => void;
};

export const useUpdateProductLikesMutation = ({ onMutate }: UseUpdateProductLikesMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productIds: number[]) => http.put<{ productIds: number[] }, Product[]>('/like', { productIds }),

    onMutate: async (productIds) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PRODUCTS() });
      const previousProductIds = queryClient.getQueryData<number[]>(QUERY_KEYS.PRODUCTS()) || [];

      queryClient.setQueryData<number[]>(QUERY_KEYS.PRODUCTS(), productIds);
      onMutate?.();

      return previousProductIds;
    },

    onError: (_error, _product, context) => {
      queryClient.setQueryData(QUERY_KEYS.PRODUCTS(), context);
    },

    onSuccess: (products) => {
      queryClient.setQueryData<Product[]>(QUERY_KEYS.PRODUCTS(), products);
    },
  });
};
