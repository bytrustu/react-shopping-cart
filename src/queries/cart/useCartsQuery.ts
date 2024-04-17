import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys.ts';
import { Cart } from '@/types';
import { http } from '@/utils';

const fetchCarts = async () => http.get<Cart[]>('/carts');

export const useCartsQuery = () =>
  useQuery({
    queryKey: QUERY_KEYS.CARTS(),
    queryFn: () => fetchCarts(),
  });
