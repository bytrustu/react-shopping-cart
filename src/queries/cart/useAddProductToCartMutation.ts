import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys.ts';
import { Cart } from '@/types';
import { http } from '@/utils';

type UseAddProductToCartMutation = {
  onMutate?: () => void;
};

export const useAddProductToCartMutation = ({ onMutate }: UseAddProductToCartMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cart: Cart) => http.post<Cart, Cart[]>('/cart', cart),

    onMutate: async (cart) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.CARTS() });
      const previousCarts = queryClient.getQueryData<Cart[]>(QUERY_KEYS.CARTS()) || [];
      const existingCart = previousCarts.find((c) => c.product.id === cart.product.id);

      if (existingCart) {
        const updatedCarts = previousCarts.map((c) => {
          if (c.product.id === cart.product.id && cart.quantity <= 20) {
            return {
              ...c,
              quantity: c.quantity + cart.quantity,
            };
          }
          return c;
        });

        queryClient.setQueryData<Cart[]>(QUERY_KEYS.CARTS(), updatedCarts);
        return updatedCarts;
      }
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
