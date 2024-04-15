import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Product } from '@/types';
import { http } from '@/utils';

const fetchProduct = async (param: Pick<Product, 'id'>) => http.get<Product>(`/products/${param.id}`);

type UseProductsQuery = {
  id: number;
};

export const useProductQuery = ({ id }: UseProductsQuery) =>
  useQuery({
    queryKey: QUERY_KEYS.PRODUCT({ id }),
    queryFn: () => fetchProduct({ id }),
  });
