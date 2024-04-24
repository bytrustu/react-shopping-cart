import { clsx } from 'clsx';
import { HTMLProps, ReactElement } from 'react';
import { flex } from '@styled-system/patterns';
import { Button } from '@/components';

type IconButtonProps = HTMLProps<HTMLButtonElement> & {
  icon: ReactElement;
  variant?: 'solid' | 'outline' | 'ghost';
};

export const IconButton = ({ className, icon, variant = 'outline', onClick, ...props }: IconButtonProps) => (
  <Button
    variant={variant}
    className={clsx(
      flex({
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        outlineColor: 'gray300',
      }),
      className,
    )}
    onClick={onClick}
    style={{
      padding: 0,
    }}
    {...props}
  >
    {icon}
  </Button>
);

IconButton.displayName = 'IconButton';
