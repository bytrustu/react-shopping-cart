import { ReactNode } from 'react';
import { flex } from '@styled-system/patterns';
import { Button } from '@/components';

type IconButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
};

export const IconButton = ({ icon, onClick }: IconButtonProps) => (
  <Button
    variant="outline"
    className={flex({
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      padding: 0,
      outlineColor: 'gray300',
    })}
    onClick={onClick}
  >
    {icon}
  </Button>
);
