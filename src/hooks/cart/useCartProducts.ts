import { useMemo } from 'react';
import { useCartStore } from '@/store';

export const useCartProducts = () => {
  const cartStore = useCartStore();

  const allCartProductsChecked = useMemo(
    () => cartStore.cartProducts.every((cart) => cart.checked) && cartStore.cartProducts.length > 0,
    [cartStore.cartProducts],
  );

  const checkedCartProducts = useMemo(
    () => cartStore.cartProducts.filter((cart) => cart.checked),
    [cartStore.cartProducts],
  );

  const checkedCartProductIds = useMemo(
    () => checkedCartProducts.map((cart) => cart.product.id),
    [checkedCartProducts],
  );

  const checkedCartProductImages = useMemo(
    () => checkedCartProducts.map((cart) => cart.product.imageUrl),
    [checkedCartProducts],
  );

  const totalCartProductPrice = useMemo(
    () => checkedCartProducts.reduce((acc, cart) => acc + cart.product.price * cart.quantity, 0),
    [checkedCartProducts],
  );

  return {
    allChecked: allCartProductsChecked,
    checkedValues: checkedCartProducts,
    checkedIds: checkedCartProductIds,
    checkedImages: checkedCartProductImages,
    totalPrice: totalCartProductPrice,
  };
};
