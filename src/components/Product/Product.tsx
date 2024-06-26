import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { z } from 'zod';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { Button, Divider, Typography, Image, IconButton, LikeIconButton } from '@/components';
import { tokens } from '@/styles/tokens.ts';
import { ProductSchema } from '@/types';
import { formatNumberWithCommas } from '@/utils';

export const ProductPropsScheme = ProductSchema.extend({
  addCart: z.function().args(z.number()).returns(z.void()),
  moveToProductDetail: z.function().args(z.number()).returns(z.void()),
});

export type ProductProps = z.infer<typeof ProductPropsScheme>;

export const Product = ({ id, name, price = 0, imageUrl, liked, addCart, moveToProductDetail }: ProductProps) => {
  const priceString = `${formatNumberWithCommas(price)}원`;

  return (
    <section
      className={flex({
        width: '100%',
        flexDirection: 'column',
        alignItems: 'space-between',
        marginTop: '10px',
        outline: '1px solid #ddd',
        borderRadius: '4px',
      })}
    >
      <Button variant="ghost" style={{ padding: 0 }} onClick={() => moveToProductDetail(id)}>
        <Image style={{ outline: 'none' }} src={imageUrl} alt={name} />
        <div
          className={css({
            width: '100%',
            height: '48px',
            textAlign: 'left',
            marginTop: '10px',
            paddingX: '6px',
            overflow: 'hidden',
          })}
        >
          <Typography variant="subtitle" className={css({ color: 'black' })}>
            {name}
          </Typography>
        </div>
      </Button>
      <Divider />
      <div
        className={flex({
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '0 10px 6px',
        })}
      >
        <Typography variant="body">{priceString}</Typography>
        <div
          className={flex({
            gap: '4px',
          })}
        >
          <LikeIconButton productId={id} liked={liked} />
          <IconButton
            variant="ghost"
            aria-label="장바구니 추가 버튼"
            className={css({ width: '20px', height: '20px', padding: 0 })}
            icon={<PiShoppingCartSimpleLight size={24} color={tokens.colors.teal200.value} />}
            onClick={(e) => {
              e.stopPropagation();
              addCart(id);
            }}
          />
        </div>
      </div>
    </section>
  );
};

Product.displayName = 'Product';
