import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Alert, Layout } from '@/components';

export const Route = createRootRoute({
  component: () => (
    <Layout.Root>
      <Layout.Header />
      <Layout.Body>
        <Outlet />
      </Layout.Body>
      <TanStackRouterDevtools position="bottom-right" />
      <Alert />
    </Layout.Root>
  ),
});
