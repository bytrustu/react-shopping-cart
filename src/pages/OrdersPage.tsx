import { z } from 'zod';
import { flex } from '@styled-system/patterns';
import { OrderHistory, Typography } from '@/components';
import { useOrdersQuery } from '@/queries';
import { OrderSchema } from '@/types';

export const OrdersPage = () => {
  const ordersQuery = useOrdersQuery();
  const orders = ordersQuery.data && z.array(OrderSchema).parse(ordersQuery.data);

  return (
    <div className={flex({ flexDirection: 'column', gap: '20px', padding: '20px' })}>
      <Typography variant="headline">주문 목록</Typography>
      <OrderHistory values={orders} loading={ordersQuery.isLoading} />
    </div>
  );
};
