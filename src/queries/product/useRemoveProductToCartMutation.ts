import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Cart } from '@/types';
import { http } from '@/utils';

export type UseRemoveProductFromCartMutation = {
  onMutate?: () => void;
};

export const useRemoveProductFromCartMutation = ({ onMutate }: UseRemoveProductFromCartMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: number) => http.delete<{ id: number }>(`/carts/${cartId}`),

    onMutate: async (cartId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.CARTS() });
      const previousCarts = queryClient.getQueryData<Cart[]>(QUERY_KEYS.CARTS()) || [];

      queryClient.setQueryData<Cart[]>(
        QUERY_KEYS.CARTS(),
        (currentCarts) => currentCarts?.filter((cart) => cart.id !== cartId) || [],
      );
      onMutate?.();
      return previousCarts;
    },

    onError: (_error, _cartId, context) => {
      queryClient.setQueryData(QUERY_KEYS.CARTS(), context);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARTS() });
    },
  });
};
