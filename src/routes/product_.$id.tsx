import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailPage } from '@/pages';

export const Route = createFileRoute('/product/$id')({
  component: () => <ProductDetailPage />,
});
