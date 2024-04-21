import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queries';
import { Cart } from '@/types';
import { http } from '@/utils';

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => http.delete('/carts/all'),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.CARTS() });
      const previousCarts = queryClient.getQueryData<Cart[]>(QUERY_KEYS.CARTS()) || [];
      queryClient.setQueryData(QUERY_KEYS.CARTS(), []);
      return { previousCarts };
    },

    onError: (error, _variables, context) => {
      console.error('useClearCartMutation Error:', error);
      queryClient.setQueryData(QUERY_KEYS.CARTS(), context?.previousCarts);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARTS() });
    },
  });
};
