import { createLazyFileRoute } from '@tanstack/react-router';
import { OrdersPage } from '@/pages';

export const Route = createLazyFileRoute('/orders')({
  component: OrdersPage,
});
