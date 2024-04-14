import { createLazyFileRoute } from '@tanstack/react-router';

const AboutPage = () => <div>장바구니</div>;

export const Route = createLazyFileRoute('/cart')({
  component: AboutPage,
});
