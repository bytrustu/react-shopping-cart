import { useNavigate } from '@tanstack/react-router';
import { useAddProductToCartMutation, useProductsQuery } from '@/queries';
import { useAlertStore } from '@/store';

export const useAddToCart = () => {
  const navigate = useNavigate({ from: '/' });
  const addProductToCartMutation = useAddProductToCartMutation();
  const productsQuery = useProductsQuery();
  const alertStore = useAlertStore();

  const addCart = (id: number) => {
    const product = productsQuery.data?.pages.flatMap((page) => page.products).find((product) => product.id === id);
    if (product) {
      addProductToCartMutation.mutate({ ...product, quantity: 1 });
    }
    alertStore.open({
      message: '장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?',
      confirmText: '예',
      cancelText: '아니오',
      onClose: () => {
        alertStore.close();
      },
      onConfirm: () => {
        navigate({
          to: '/cart',
        });
        alertStore.close();
      },
    });
  };

  return { open: addCart, close: alertStore.close };
};
