import { useNavigate } from '@tanstack/react-router';
import { useAlert } from '@/hooks/useAlert.tsx';
import { useAddProductToCartMutation, useProductsQuery } from '@/queries';

export const useAddToCart = () => {
  const navigate = useNavigate({ from: '/' });
  const addProductToCartMutation = useAddProductToCartMutation();
  const productsQuery = useProductsQuery();
  const alert = useAlert();

  const addCart = async (id: number) => {
    const product = productsQuery.data?.pages.flatMap((page) => page.products).find((product) => product.id === id);
    if (!product) {
      return;
    }
    addProductToCartMutation.mutate({ product, quantity: 1 });
    const confirm = await alert.open({
      message: '장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?',
      confirmText: '예',
      cancelText: '아니오',
    });
    if (confirm) {
      navigate({
        to: '/cart',
      });
    }
  };

  const addCarts = async (ids: number[]) => {
    const products = productsQuery.data?.pages
      .flatMap((page) => page.products)
      .filter((product) => ids.includes(product.id));
    if (!products) {
      return;
    }
    products.forEach((product) => {
      addProductToCartMutation.mutate({ product, quantity: 1 });
    });
    const confirm = await alert.open({
      message: '장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?',
      confirmText: '예',
      cancelText: '아니오',
    });
    if (confirm) {
      navigate({
        to: '/cart',
      });
    }
  };

  return { single: addCart, multiple: addCarts };
};
