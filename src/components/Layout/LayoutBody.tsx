import { PropsWithChildren } from 'react';
import { css } from '@styled-system/css';

export const LayoutBody = ({ children }: PropsWithChildren) => (
  <main
    className={css({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '1200px',
      margin: '60px auto 0 auto',
      padding: '60px 20px',
    })}
  >
    {children}
  </main>
);

LayoutBody.displayName = 'LayoutBody';
