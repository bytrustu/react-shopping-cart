import { clsx } from 'clsx';
import { HTMLProps } from 'react';
import { css } from '@styled-system/css';

type DividerProps = HTMLProps<HTMLHRElement>;

export const Divider = ({ className }: DividerProps) => (
  <hr
    className={clsx(
      css({
        width: '100%',
        borderTop: '1px solid #ddd',
        marginY: '10px',
      }),
      className,
    )}
  />
);

Divider.displayName = 'Divider';
