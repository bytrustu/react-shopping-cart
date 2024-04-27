import { css } from '@styled-system/css';
import { GlobalNavigation } from '@/components';

const MENU_PATHS = [
  {
    title: '장바구니',
    path: '/cart',
  },
  {
    title: '주문목록',
    path: '/orders',
  },
];

export const LayoutHeader = () => (
  <header className={headerStyles}>
    <GlobalNavigation menuPaths={MENU_PATHS} />
  </header>
);

const headerStyles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: '375px',
  height: '60px',
  backgroundColor: 'teal200',
  zIndex: 'header',
});

LayoutHeader.displayName = 'LayoutHeader';
