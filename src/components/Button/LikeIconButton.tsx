import { HTMLProps } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { css } from '@styled-system/css';
import { IconButton } from '@/components';
import { useProductLike } from '@/hooks';

type LikeIconButtonProps = HTMLProps<HTMLButtonElement> & {
  productId: number;
  liked?: boolean;
};

export const LikeIconButton = ({ productId, liked, ...props }: LikeIconButtonProps) => {
  const productLiked = useProductLike();
  return (
    <IconButton
      variant="ghost"
      className={css({
        padding: 0,
        width: '20px',
        height: '20px',
      })}
      icon={
        liked ? (
          <AiFillHeart width="20px" height="20px" color="tael200" />
        ) : (
          <AiOutlineHeart width="20px" height="20px" color="teal200" />
        )
      }
      aria-label="찜 toggle 버튼"
      onClick={(e) => {
        e.stopPropagation();
        productLiked.toggle(productId, Boolean(liked));
      }}
      {...props}
    />
  );
};
