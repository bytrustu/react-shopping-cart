import { flex } from '@styled-system/patterns';
import { OrderHistory, Typography } from '@/components';
import { Order } from '@/types/order.type';

export const OrdersPage = () => {
  const orders: Order[] = [
    {
      id: 1,
      timestamp: Date.now(),
      totalPrice: 10000,
      products: [
        {
          id: 1,
          name: '상품1',
          price: 5000,
          quantity: 2,
          imageUrl: 'https://via.placeholder.com/120',
        },
        {
          id: 2,
          name: '상품2',
          price: 3000,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/120',
        },
      ],
    },
    {
      id: 2,
      timestamp: Date.now(),
      totalPrice: 20000,
      products: [
        {
          id: 3,
          name: '상품3',
          price: 10000,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/120',
        },
      ],
    },
  ];

  return (
    <div className={flex({ flexDirection: 'column', gap: '20px', padding: '20px' })}>
      <Typography variant="headline">주문내역</Typography>
      <OrderHistory orders={orders} />
    </div>
  );
};
