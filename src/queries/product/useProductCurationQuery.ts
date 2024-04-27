import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Product } from '@/types';
import { http } from '@/utils';

const fetchProductCuration = async () => http.get<Product[]>('/curation');

export const useProductCurationQuery = () =>
  useQuery({
    queryKey: QUERY_KEYS.PRODUCT_CURATION(),
    queryFn: () => fetchProductCuration(),
  });
