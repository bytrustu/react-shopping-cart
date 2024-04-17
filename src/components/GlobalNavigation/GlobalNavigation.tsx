import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Typography } from '@/components';

type GlobalNavigationProps = {
  menuPaths: Array<{
    title: string;
    path: string;
  }>;
};

const Logo = () => {
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate({ to: '/' });
  };

  return (
    <Button variant="ghost" className={flex({ alignItems: 'center', gap: '10px', padding: 0 })} onClick={moveToHome}>
      <PiShoppingCartSimpleFill size={24} color="white" />
      <Typography variant="display" className={css({ fontWeight: 'bold', color: 'white' })}>
        NEXTSTEP
      </Typography>
    </Button>
  );
};

export const GlobalNavigation = ({ menuPaths }: GlobalNavigationProps) => (
  <nav className={navContainerStyles}>
    <Logo />
    <div className={flex({ gap: '20px' })}>
      {menuPaths.map((menuPath) => (
        <Link key={menuPath.path} to={menuPath.path}>
          <Typography variant="headline" className={css({ color: 'white' })}>
            {menuPath.title}
          </Typography>
        </Link>
      ))}
    </div>
  </nav>
);

const navContainerStyles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  width: '100%',
  padding: '0 20px',
});

GlobalNavigation.displayName = 'GlobalNavigation';
