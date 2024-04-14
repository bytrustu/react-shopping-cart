import { PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { LayoutBody, LayoutHeader } from '@/components';

export const Layout = ({ children }: PropsWithChildren) => (
  <div
    className={css({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
    })}
  >
    {children}
  </div>
);

Layout.Root = Layout;
Layout.Header = LayoutHeader;
Layout.Body = LayoutBody;

Layout.displayName = 'Layout';
