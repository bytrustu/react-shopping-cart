import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Order } from '@/types';
import { http } from '@/utils';

const fetchOrder = async (param: Pick<Order, 'id'>) => http.get<Order>(`/orders/${param.id}`);

type UseOrderQuery = {
  id: number;
};

export const useOrderQuery = ({ id }: UseOrderQuery) =>
  useQuery({
    queryKey: QUERY_KEYS.ORDERS({ id }),
    queryFn: () => fetchOrder({ id }),
  });
