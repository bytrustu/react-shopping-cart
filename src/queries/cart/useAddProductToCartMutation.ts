import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys.ts';
import { LOCAL_STORAGE_CART_KEY } from '@/constants';
import { Cart } from '@/types';
import { http, localStorageUtil } from '@/utils';

export type UseAddProductToCartMutation = {
  onMutate?: () => void;
};

export const useAddProductToCartMutation = ({ onMutate }: UseAddProductToCartMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cart: Cart) => http.post<Cart, Cart>('/cart', cart),

    onMutate: async (cart) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.CARTS() });
      const previousCarts = queryClient.getQueryData<Cart[]>(QUERY_KEYS.CARTS()) || [];

      queryClient.setQueryData<Cart[]>(QUERY_KEYS.CARTS(), [...previousCarts, cart]);
      onMutate?.();
      return previousCarts;
    },

    onError: (_error, _product, context) => {
      queryClient.setQueryData(QUERY_KEYS.CARTS(), context);
    },

    onSuccess: (newCart: Cart) => {
      queryClient.setQueryData<Cart[]>(QUERY_KEYS.CARTS(), (prevCarts) => [...(prevCarts ?? []), newCart]);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARTS() });
      const cartIds = localStorageUtil.getItem<number[]>(LOCAL_STORAGE_CART_KEY) || [];
      if (cartIds?.includes(newCart.id)) {
        return;
      }
      localStorageUtil.setItem(LOCAL_STORAGE_CART_KEY, [...(cartIds ?? []), newCart.id]);
    },
  });
};
