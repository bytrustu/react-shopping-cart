import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { z } from 'zod';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { Button, Typography } from '@/components';
import { tokens } from '@/styles/tokens.ts';
import { ProductSchema } from '@/types';
import { formatNumberWithCommas } from '@/utils';

export const ProductPropsScheme = ProductSchema.extend({
  addCart: z.function().args(z.number()).returns(z.void()),
  moveToProductDetail: z.function().args(z.number()).returns(z.void()),
});

export type ProductProps = z.infer<typeof ProductPropsScheme>;

export const Product = ({ id, name, price = 0, imageUrl, addCart, moveToProductDetail }: ProductProps) => {
  const priceString = `${formatNumberWithCommas(price)} 원`;

  return (
    <Button
      variant="ghost"
      onClick={() => moveToProductDetail(id)}
      className={css({
        padding: 0,
        color: 'unset',
      })}
    >
      <img src={imageUrl} alt={name} />
      <div
        className={flex({
          width: '100%',
          flexDirection: 'column',
          alignItems: 'space-between',
          marginTop: '10px',
          paddingX: '6px',
        })}
      >
        <div
          className={css({
            width: '100%',
            height: '48px',
            textAlign: 'left',
          })}
        >
          <Typography variant="subtitle">{name}</Typography>
        </div>
        <hr
          className={css({
            width: '100%',
            height: '1px',
            borderTop: `1px solid #ddd`,
            margin: '10px 0',
          })}
        />
        <div
          className={flex({
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          })}
        >
          <Typography variant="body">{priceString}</Typography>
          <Button
            variant="ghost"
            className={css({ padding: 0 })}
            onClick={(e) => {
              e.stopPropagation();
              addCart(id);
            }}
          >
            <PiShoppingCartSimpleLight size={24} color={tokens.colors.blue.value} />
          </Button>
        </div>
      </div>
    </Button>
  );
};

Product.displayName = 'Product';
