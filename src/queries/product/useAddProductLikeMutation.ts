import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOCAL_STORAGE_LIKE_KEY } from '@/constants';
import { QUERY_KEYS } from '@/queries';
import { Order, Product } from '@/types';
import { http, localStorageUtil } from '@/utils';

type UseAddProductToLikeMutation = {
  onMutate?: () => void;
};

export const useAddProductLikeMutation = ({ onMutate }: UseAddProductToLikeMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => http.post<{ productId: number }, number>('/products/like', { productId }),

    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PRODUCT({ id: productId }) });

      const previousProduct = queryClient.setQueryData<Product>(QUERY_KEYS.PRODUCT({ id: productId }), (product) =>
        product ? { ...product, liked: true } : undefined,
      );

      onMutate?.();
      return {
        productId,
        previousProduct,
      };
    },

    onError: (_error, _productId, context) => {
      queryClient.setQueryData(QUERY_KEYS.PRODUCT({ id: context?.productId }), context?.previousProduct);
    },

    onSuccess: (productId) => {
      queryClient.setQueryData<Order[]>(QUERY_KEYS.ORDERS(), (orders) => {
        if (orders) {
          return orders?.map((order) => ({
            ...order,
            products: order.products.map((product) =>
              product.id === productId ? { ...product, liked: true } : product,
            ),
          }));
        }
        return orders;
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCT({ id: productId }) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARTS() });
      const localStorageLike = localStorageUtil.getItem<number[]>(LOCAL_STORAGE_LIKE_KEY) || [];
      const likeMap = new Map<number, boolean>(localStorageLike.map((id) => [id, true]));
      likeMap.set(productId, true);
      localStorageUtil.setItem(LOCAL_STORAGE_LIKE_KEY, [...likeMap.keys()]);
    },
  });
};
