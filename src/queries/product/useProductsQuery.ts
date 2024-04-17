import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import type { ProductsRequestParam, ProductsResponse } from '@/types';
import { generateQueryParams, http } from '@/utils';

const fetchProducts = async (pageParam: ProductsRequestParam) => {
  const queryString = generateQueryParams(pageParam);
  return http.get<ProductsResponse>(`/products?${queryString}`);
};

export const useProductsQuery = () => {
  const initialPageParam: ProductsRequestParam = {
    offset: 0,
    limit: 8,
  };

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.PRODUCTS(initialPageParam),
    queryFn: ({ pageParam = initialPageParam }) => fetchProducts(pageParam),
    getNextPageParam: (lastPage) => (lastPage.nextCursor ? { offset: lastPage.nextCursor, limit: 8 } : undefined),
    initialPageParam,
  });
};
