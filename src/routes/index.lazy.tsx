import { css } from '@styled-system/css';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '@/components';

const IndexPage = () => (
  <div>
    <h3>Home</h3>
    <Button variant="outline" colorScheme="gray" className={css({ width: '100%' })}>
      안녕하세요
    </Button>
  </div>
);

export const Route = createLazyFileRoute('/')({
  component: IndexPage,
});
