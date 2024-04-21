import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys.ts';
import { Cart } from '@/types';
import { http } from '@/utils';

type UseAddProductsToCartMutation = {
  onMutate?: () => void;
};

export const useAddProductsToCartMutation = ({ onMutate }: UseAddProductsToCartMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carts: Cart[]) => http.post<Cart[], Cart[]>('/carts', carts),

    onMutate: async (carts) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.CARTS() });
      const previousCarts = queryClient.getQueryData<Cart[]>(QUERY_KEYS.CARTS()) || [];

      queryClient.setQueryData<Cart[]>(QUERY_KEYS.CARTS(), [...previousCarts, ...carts]);
      onMutate?.();
      return previousCarts;
    },

    onError: (_error, _product, context) => {
      queryClient.setQueryData(QUERY_KEYS.CARTS(), context);
    },

    onSuccess: (newCarts: Cart[]) => {
      queryClient.setQueryData<Cart[]>(QUERY_KEYS.CARTS(), newCarts);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARTS() });
    },
  });
};
