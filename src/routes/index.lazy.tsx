import { createLazyFileRoute } from '@tanstack/react-router';

const IndexPage = () => (
  <div>
    <h3>Home</h3>
  </div>
);

export const Route = createLazyFileRoute('/')({
  component: IndexPage,
});
