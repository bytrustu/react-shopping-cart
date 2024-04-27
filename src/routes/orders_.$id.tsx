import { createFileRoute } from '@tanstack/react-router';
import { PaymentPage } from '@/pages';

export const Route = createFileRoute('/orders/$id')({
  component: () => <PaymentPage />,
});
