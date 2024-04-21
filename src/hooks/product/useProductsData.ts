import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useProductsQuery } from '@/queries';

export const useProductsData = () => {
  const productsQuery = useProductsQuery();
  const { ref, inView } = useInView();

  const products = productsQuery.data?.pages.flatMap((page) => page.products);
  const loadingInitialData = productsQuery.isLoading && !productsQuery.isFetchingNextPage;
  const shouldDisplaySkeleton = loadingInitialData || productsQuery.isFetchingNextPage;

  useEffect(() => {
    const lastPage = productsQuery.data?.pages[productsQuery.data.pages.length - 1];
    if (inView && lastPage?.nextCursor && !shouldDisplaySkeleton) {
      productsQuery.fetchNextPage();
    }
  }, [inView, shouldDisplaySkeleton, productsQuery.data]);

  return {
    value: products,
    loading: shouldDisplaySkeleton,
    fetchedAfterMount: productsQuery.isFetchedAfterMount,
    ref,
  };
};
