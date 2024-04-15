import { PropsWithChildren } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import { css } from '@styled-system/css';
import { flex, grid } from '@styled-system/patterns';
import { Button, Typography } from '@/components';
import { Product } from '@/types';
import { formatNumberWithCommas } from '@/utils';

type ProductImageProps = Partial<Pick<Product, 'imageUrl' | 'name'>>;

const ProductImage = ({ imageUrl, name }: ProductImageProps) => (
  <figure>
    <img
      className={css({
        width: {
          base: '100%',
          md: 'auto',
        },
      })}
      src={imageUrl}
      alt={name}
    />
  </figure>
);

type ProductTitleProps = Partial<Pick<Product, 'name'>>;

const ProductTitle = ({ name }: ProductTitleProps) => (
  <header
    className={flex({
      flexDirection: 'column',
      gap: '10px',
    })}
  >
    <Typography variant="display">{name}</Typography>
    <hr className={css({ borderTop: '1px solid #ddd' })} />
  </header>
);

type ProductPriceProps = Partial<Pick<Product, 'price'>>;

const ProductPrice = ({ price }: ProductPriceProps) => (
  <div
    className={flex({
      justifyContent: 'space-between',
      alignItems: 'center',
    })}
  >
    <Typography variant="title">금액</Typography>
    <Typography variant="headline">{formatNumberWithCommas(price ?? 0)}</Typography>
  </div>
);

type ProductActionProps = {
  onAddToCart: () => void;
};

const ProductAction = ({ onAddToCart }: ProductActionProps) => (
  <div
    className={flex({
      justifyContent: 'space-between',
      alignItems: 'center',
    })}
  >
    <Button
      variant="outline"
      color="gray"
      className={flex({
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        padding: 0,
      })}
    >
      <AiFillHeart />
    </Button>
    <Button variant="solid" color="teal" className={css({ width: 'calc(100% - 50px)' })} onClick={onAddToCart}>
      장바구니
    </Button>
  </div>
);

type ProductInfoProps = Pick<Product, 'name' | 'price'> & {
  onAddToCart: () => void;
};

const ProductInfo = ({ name, price, onAddToCart }: ProductInfoProps) => (
  <section
    className={flex({
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '4px',
    })}
  >
    <ProductTitle name={name} />
    <div
      className={flex({
        flexDirection: 'column',
        gap: '10px',
        marginTop: '20px',
      })}
    >
      <ProductPrice price={price} />
      <ProductAction onAddToCart={onAddToCart} />
    </div>
  </section>
);

type ProductDetailProps = {
  loading?: boolean;
};
export const ProductDetail = ({ children, loading }: PropsWithChildren<ProductDetailProps>) => (
  <main
    className={grid({
      gridTemplateColumns: {
        base: 'repeat(1, minmax(0, 1fr))',
        md: 'repeat(2, minmax(0, 1fr))',
      },
    })}
  >
    {loading ? (
      <>
        <Skeleton width="500px" height="500px" />
        <Skeleton width="575px" height="500px" />
      </>
    ) : null}
    {children}
  </main>
);

ProductDetail.Root = ProductDetail;
ProductDetail.Image = ProductImage;
ProductDetail.Info = ProductInfo;

ProductDetail.displayName = 'ProductDetail';
