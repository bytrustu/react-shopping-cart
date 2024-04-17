import Skeleton from 'react-loading-skeleton';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

export const ProductSkeleton = () => (
  <div
    className={flex({
      width: '100%',
      flexDirection: 'column',
      gap: '10px',
    })}
  >
    <Skeleton
      enableAnimation
      count={1}
      className={css({
        width: '100%',
        height: '260px',
      })}
    />
    <Skeleton
      enableAnimation
      count={2}
      className={css({
        width: '100%',
        height: '45px',
      })}
    />
  </div>
);
