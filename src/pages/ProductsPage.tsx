import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Products } from '@/components';
import { useLocalCartIds } from '@/hooks';
import {
  useAddProductToCartMutation,
  useCartsQuery,
  useProductsQuery,
  useRemoveProductFromCartMutation,
} from '@/queries';
import { localStorageUtil } from '@/utils';

export const ProductsPage = () => {
  const productsQuery = useProductsQuery();
  const cartsQuery = useCartsQuery();
  const addProductToCartMutation = useAddProductToCartMutation();
  const removeProductFromCartMutation = useRemoveProductFromCartMutation();
  const localCartIds = useLocalCartIds();
  const serverCardIds = cartsQuery.data?.map((cart) => cart.id) ?? [];
  const { ref, inView } = useInView();

  const products = productsQuery.data?.pages
    .flatMap((page) => page.products)
    .map((product) => ({
      ...product,
      addedToCart: serverCardIds.includes(product.id),
    }));
  const loadingInitialData = productsQuery.isLoading && !productsQuery.isFetchingNextPage;
  const shouldDisplaySkeleton = loadingInitialData || productsQuery.isFetchingNextPage;

  const addCart = (id: number) => {
    if (serverCardIds.includes(id)) {
      return;
    }

    const product = productsQuery.data?.pages.flatMap((page) => page.products).find((product) => product.id === id);
    if (product) {
      addProductToCartMutation.mutate({ ...product, quantity: 1 });
      const newCartIds = [...serverCardIds, id];
      localStorageUtil.setItem('carts', newCartIds);
      localCartIds.set(newCartIds);
    }
  };

  const removeCart = (id: number) => {
    removeProductFromCartMutation.mutate(id);
    const updatedCartIds = serverCardIds.filter((cartId) => cartId !== id);
    localStorageUtil.setItem('carts', updatedCartIds);
    localCartIds.set(updatedCartIds);
  };

  useEffect(() => {
    const lastPage = productsQuery.data?.pages[productsQuery.data.pages.length - 1];
    if (inView && lastPage?.nextCursor && !shouldDisplaySkeleton) {
      productsQuery.fetchNextPage();
    }
  }, [inView, shouldDisplaySkeleton, productsQuery.data]);

  return (
    <>
      <Products values={products} loading={shouldDisplaySkeleton} addCart={addCart} removeCart={removeCart} />
      {productsQuery.isFetchedAfterMount && <div ref={ref} />}
    </>
  );
};
