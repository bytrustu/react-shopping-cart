import { useEffect } from 'react';
import { LOCAL_STORAGE_CART_KEY, LOCAL_STORAGE_LIKE_KEY, LOCAL_STORAGE_ORDER_KEY } from '@/constants';
import { useSync } from '@/hooks/useSync.ts';
import {
  useAddOrdersMutation,
  useAddProductsToCartMutation,
  useCartsQuery,
  useOrdersQuery,
  useUpdateProductsMutation,
} from '@/queries';
import { useCartStore, useOrderStore } from '@/store';
import { CartState, OrderState } from '@/types';
import { localStorageUtil } from '@/utils';

export const useSyncWithServer = () => {
  const cartsQuery = useCartsQuery();
  const cartStore = useCartStore();
  const addProductsToCartMutation = useAddProductsToCartMutation();
  const updateProductsMutation = useUpdateProductsMutation();

  const ordersQuery = useOrdersQuery();
  const orderStore = useOrderStore();
  const addOrdersMutation = useAddOrdersMutation();

  const localStorageLike = localStorageUtil.getItem<number[]>(LOCAL_STORAGE_LIKE_KEY) || [];
  const updateProductServer = () => {
    updateProductsMutation.mutate(localStorageLike);
  };

  const { update: updateCartServer } = useSync({
    localStorageKey: LOCAL_STORAGE_CART_KEY,
    serverQuery: cartsQuery,
    getLocalStorageData: () => {
      const cartState = localStorageUtil.getItem<CartState>(LOCAL_STORAGE_CART_KEY);
      if (cartState?.state?.cartProducts) {
        return {
          state: {
            data: cartState.state.cartProducts.map((cart) =>
              localStorageLike.includes(cart.product.id)
                ? {
                    ...cart,
                    checked: true,
                  }
                : cart,
            ),
          },
          version: cartState.version,
        };
      }
      return null;
    },
    setData: (cartProducts) =>
      cartStore.setCartProducts(
        cartProducts.map((cartProduct) => ({
          ...cartProduct,
          checked: false,
          product: { ...cartProduct.product, liked: localStorageLike.includes(cartProduct.product.id) },
        })),
      ),
    getKey: (cartProduct) => cartProduct.product.id,
    updateServer: async (cartProducts) => {
      await addProductsToCartMutation.mutateAsync(cartProducts);
      return Promise.resolve();
    },
  });

  const { update: updateOrderServer } = useSync({
    localStorageKey: LOCAL_STORAGE_ORDER_KEY,
    serverQuery: ordersQuery,
    getLocalStorageData: () => {
      const localStorageOrder = localStorageUtil.getItem<OrderState>(LOCAL_STORAGE_ORDER_KEY);
      if (localStorageOrder?.state?.orders) {
        const orders = localStorageOrder.state.orders
          .map((order) => ({
            ...order,
            products: order.products.map((product) => ({ ...product, liked: localStorageLike.includes(product.id) })),
          }))
          .sort((a, b) => b.id - a.id);
        return {
          state: { data: orders },
          version: localStorageOrder.version,
        };
      }
      return null;
    },
    setData: (orders) =>
      orderStore.setOrders(
        orders.map((order) => ({
          ...order,
          products: order.products.map((product) => ({ ...product, liked: localStorageLike.includes(product.id) })),
        })),
      ),
    getKey: (order) => order.id,
    updateServer: async (orders) => {
      await addOrdersMutation.mutateAsync(orders);
      return Promise.resolve();
    },
  });

  useEffect(() => {
    updateCartServer();
    updateOrderServer();
    updateProductServer();
  }, []);
};
