import { clsx } from 'clsx';
import { css } from '@styled-system/css';

type DividerProps = {
  className?: string;
};
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
