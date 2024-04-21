import { useEffect } from 'react';
import { LOCAL_STORAGE_CART_KEY } from '@/constants';
import { useAddProductsToCartMutation, useCartsQuery } from '@/queries';
import { useCartStore } from '@/store';
import { Cart, CartState } from '@/types';
import { localStorageUtil } from '@/utils';

export const useSyncCart = () => {
  const cartsQuery = useCartsQuery();
  const cartStore = useCartStore();
  const addProductsToCartMutation = useAddProductsToCartMutation();

  const handleUpdateServerCart = () => {
    addProductsToCartMutation.mutate(cartStore.cartProducts);
  };

  useEffect(() => {
    try {
      const localStorageCartProducts = localStorageUtil.getItem<CartState>(LOCAL_STORAGE_CART_KEY);
      const serverCartProducts = cartsQuery.data || [];
      const localCartProducts = localStorageCartProducts?.state.cartProducts || [];
      const localCartProductsMap = new Map(
        localCartProducts.map((localCartProduct) => [localCartProduct.product.id, localCartProduct]),
      );

      const mergedCartProducts =
        serverCartProducts.length > 0
          ? serverCartProducts.reduce<Cart[]>((merged, serverCartProduct) => {
              const localCartProduct = localCartProductsMap.get(serverCartProduct.product.id);
              if (localCartProduct) {
                localCartProductsMap.delete(serverCartProduct.product.id);
                return [...merged, localCartProduct];
              }
              return [...merged, serverCartProduct];
            }, [])
          : [];

      const additionalLocalCartProducts = Array.from(localCartProductsMap.values());
      const finalCartProducts = [...mergedCartProducts, ...additionalLocalCartProducts].map((cartProduct) => ({
        ...cartProduct,
        checked: false,
      }));

      cartStore.setCartProducts(finalCartProducts);
    } catch (error) {
      console.error('useSyncCart useEffect Error:', error);
    }
  }, [cartsQuery.data]);

  return {
    update: handleUpdateServerCart,
  };
};
