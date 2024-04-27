import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queries';
import { Product } from '@/types';
import { http } from '@/utils';

type UseUpdateProductsMutation = {
  onMutate?: () => void;
};

export const useUpdateProductsMutation = ({ onMutate }: UseUpdateProductsMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productIds: number[]) =>
      http.put<{ productIds: number[] }, Product[]>('/products/like', { productIds }),

    onMutate: async (productIds) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LIKES() });

      const previousProductIds = queryClient.setQueryData<Product[]>(QUERY_KEYS.LIKES(), (products) =>
        products?.map((product) => ({
          ...product,
          liked: productIds.includes(product.id),
        })),
      );
      onMutate?.();

      return previousProductIds;
    },

    onError: (_error, _product, context) => {
      queryClient.setQueryData(QUERY_KEYS.LIKES(), context);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LIKES() });
    },
  });
};
