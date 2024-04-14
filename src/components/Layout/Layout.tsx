import { PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { LayoutBody } from './LayoutBody';
import { LayoutHeader } from './LayoutHeader';

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
