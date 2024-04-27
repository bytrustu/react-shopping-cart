import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queries';
import { Order } from '@/types';
import { http } from '@/utils';

type UseAddOrderMutation = {
  onMutate?: () => void;
};

export const useAddOrderMutation = ({ onMutate }: UseAddOrderMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: Pick<Order, 'products' | 'totalPrice'>) =>
      http.post<Pick<Order, 'products' | 'totalPrice'>, Order>('/order', order),

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
      queryClient.setQueryData<Order[]>(QUERY_KEYS.ORDERS(), (previousOrders) =>
        [...(previousOrders || []), newOrder].sort((a, b) => b.id - a.id),
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARTS() });
      return newOrder;
    },
  });
};
