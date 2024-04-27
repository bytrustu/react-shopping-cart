import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys.ts';
import { Cart } from '@/types';
import { http } from '@/utils';

export type UseRemoveProductsFromCartMutationOptions = {
  onMutate?: () => void;
};

export const useRemoveProductsFromCartMutation = ({ onMutate }: UseRemoveProductsFromCartMutationOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartIds: number[]) => http.post<{ ids: number[] }>(`/carts/remove`, { ids: cartIds }),

    onMutate: async (cartIds) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.CARTS() });
      const previousCarts = queryClient.getQueryData<Cart[]>(QUERY_KEYS.CARTS()) || [];

      queryClient.setQueryData<Cart[]>(
        QUERY_KEYS.CARTS(),
        previousCarts.filter((cart) => !cartIds.includes(cart.product.id)),
      );
      onMutate?.();
      return { previousCarts };
    },

    onError: (_error, _cartIds, context) => {
      queryClient.setQueryData(QUERY_KEYS.CARTS(), context);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARTS() });
    },
  });
};
