import { css } from '@styled-system/css';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      })}
    >
      <nav>navBar</nav>
      <main
        className={css({
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 1,
          width: '100%',
          maxWidth: '1280px',
          marginTop: '60px',
          paddingY: '60px',
        })}
      >
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
});
