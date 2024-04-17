import { createLazyFileRoute } from '@tanstack/react-router';
import { ProductsPage } from '@/pages';

export const Route = createLazyFileRoute('/')({
  component: ProductsPage,
});
