import { useMemo } from 'react';
import { flex } from '@styled-system/patterns';
import { OrderHistory, Typography } from '@/components';
import { useOrderStore } from '@/store';

export const OrdersPage = () => {
  const orderStore = useOrderStore();
  const orders = useMemo(
    () => orderStore.orders.filter((order) => Boolean(order.payment)).sort((a, b) => b.id - a.id),
    [orderStore.orders],
  );

  return (
    <div className={flex({ flexDirection: 'column', gap: '20px', padding: '20px' })}>
      <Typography variant="headline">주문 목록</Typography>
      <OrderHistory values={orders} />
    </div>
  );
};
