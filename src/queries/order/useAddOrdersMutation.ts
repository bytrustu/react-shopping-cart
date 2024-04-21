import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queries';
import { Order } from '@/types';
import { http } from '@/utils';

type UseAddOrdersMutation = {
  onMutate?: () => void;
};

export const useAddOrdersMutation = ({ onMutate }: UseAddOrdersMutation = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orders: Order[]) => http.post<Order[], Order[]>('/orders', orders),

    onMutate: async (orders) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ORDERS() });
      queryClient.setQueryData<Order[]>(QUERY_KEYS.ORDERS(), orders);
      onMutate?.();
    },

    onError: (_error, _orders, context) => {
      queryClient.setQueryData(QUERY_KEYS.ORDERS(), context);
    },
  });
};
