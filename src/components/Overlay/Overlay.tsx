import { PropsWithChildren } from 'react';
import { css } from '@styled-system/css';

export const Overlay = ({ children }: PropsWithChildren) => <div className={overlayStyles}>{children}</div>;

const overlayStyles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});
