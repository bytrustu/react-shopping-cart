import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Order } from '@/types';
import { http } from '@/utils';

const fetchOrders = async () => http.get<Order[]>('/orders');

export const useOrdersQuery = () =>
  useQuery({
    queryKey: QUERY_KEYS.ORDERS(),
    queryFn: () => fetchOrders(),
  });
