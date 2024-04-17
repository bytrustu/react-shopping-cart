import { createLazyFileRoute } from '@tanstack/react-router';
import { CartPage } from '@/pages';

export const Route = createLazyFileRoute('/cart')({
  component: CartPage,
});
