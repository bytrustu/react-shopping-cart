import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queries';
import { Order } from '@/types';
import { http } from '@/utils';

type UseAddOrderMutation = {
  onMutate?: () => void;
};

export const usePaymentMutation = ({ onMutate }: UseAddOrderMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: Order) => http.put<Order, Order>(`/orders/${order.id}`, order),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ORDERS() });
      const previousOrders = queryClient.getQueryData<Order[]>(QUERY_KEYS.ORDERS()) || [];

      onMutate?.();
      return previousOrders;
    },

    onError: (_error, _order, context) => {
      queryClient.setQueryData(QUERY_KEYS.ORDERS(), context);
    },

    onSuccess: (newOrder) => {
      queryClient.setQueryData<Order[]>(
        QUERY_KEYS.ORDERS(),
        (previousOrders) => previousOrders?.map((order) => (order.id === newOrder.id ? newOrder : order)) || [],
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS() });
      return newOrder;
    },
  });
};
