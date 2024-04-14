import { createLazyFileRoute } from '@tanstack/react-router';

const AboutPage = () => <div>주문목록</div>;

export const Route = createLazyFileRoute('/orders')({
  component: AboutPage,
});
