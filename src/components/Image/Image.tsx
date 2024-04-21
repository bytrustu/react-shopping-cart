import { clsx } from 'clsx';
import { HTMLProps } from 'react';
import { css } from '@styled-system/css';

type ImageProps = HTMLProps<HTMLImageElement>;

export const Image = ({ className, alt, ...props }: ImageProps) => (
  <img
    className={clsx(
      className,
      css({
        borderRadius: '2px',
        outline: '1px solid #d1d1d1',
      }),
    )}
    alt={alt}
    {...props}
  />
);

Image.displayName = 'Image';
