import { cloneElement, ReactElement } from 'react';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { Typography } from '@/components';

type EmptyDescriptionProps = {
  icon: ReactElement;
  description: string;
};

export const EmptyDescription = ({ icon, description }: EmptyDescriptionProps) => (
  <div
    className={flex({
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '60px',
    })}
  >
    {cloneElement(icon, { className: css({ width: '100px', height: '100px' }) })}
    <Typography variant="display">{description}</Typography>
  </div>
);
