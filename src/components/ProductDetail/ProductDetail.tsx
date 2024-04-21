import { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { flex, grid } from '@styled-system/patterns';
import { Button, Divider, Image, LikeIconButton, Typography } from '@/components';
import { Product, ProductSchema } from '@/types';
import { formatNumberWithCommas } from '@/utils';

type ProductDetailProps = PropsWithChildren<{
  product?: Product;
  addToCart: (id: number) => void;
  loading?: boolean;
}>;

type ProductDetailContextType = Pick<ProductDetailProps, 'product' | 'addToCart'> | undefined;

const ProductDetailContext = createContext<ProductDetailContextType>(undefined);

const ProductDetailProvider = ({ product, addToCart, children }: ProductDetailProps) => {
  const value = useMemo(() => ({ product, addToCart }), [product, addToCart]);

  return <ProductDetailContext.Provider value={value}>{children}</ProductDetailContext.Provider>;
};

const useProductDetail = () => {
  const context = useContext(ProductDetailContext);
  if (!context) {
    throw new Error('ProductDetail 컴포넌트는 ProductDetail.Root 컴포넌트 내부에서 사용되어야 합니다.');
  }

  return context;
};

const ProductImage = () => {
  const { product } = useProductDetail();

  ProductSchema.parse(product);

  return (
    <figure
      className={css({
        outline: '1px solid #ddd',
        borderRadius: '4px',
      })}
    >
      <Image
        className={css({
          width: '100%',
        })}
        src={product?.imageUrl}
        alt={product?.name}
      />
    </figure>
  );
};

const ProductTitle = () => {
  const { product } = useProductDetail();
  return (
    <header
      className={flex({
        flexDirection: 'column',
        gap: '10px',
      })}
    >
      <Typography variant="display">{product?.name}</Typography>
      <Divider />
    </header>
  );
};

const ProductPrice = () => {
  const { product } = useProductDetail();
  const priceFormatted = `${formatNumberWithCommas(product?.price || 0)} 원`;
  return (
    <div
      className={flex({
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '40px',
      })}
    >
      <Typography variant="title">상품 가격</Typography>
      <Typography variant="headline">{priceFormatted}</Typography>
    </div>
  );
};

const ProductAction = () => {
  const { product, addToCart } = useProductDetail();
  const handleAddToCart = () => {
    const productId = ProductSchema.pick({ id: true }).parse(product).id;
    addToCart(productId);
  };

  const validProduct = ProductSchema.pick({ id: true, liked: true }).parse(product);

  return (
    <div
      className={flex({
        justifyContent: 'space-between',
        alignItems: 'center',
      })}
    >
      <LikeIconButton productId={validProduct.id} liked={Boolean(validProduct?.liked)} />
      <Button variant="solid" color="teal" className={css({ width: 'calc(100% - 50px)' })} onClick={handleAddToCart}>
        장바구니 추가
      </Button>
    </div>
  );
};

const ProductInfo = () => (
  <article
    className={flex({
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '4px',
    })}
  >
    <ProductTitle />
    <div
      className={flex({
        flexDirection: 'column',
        gap: '10px',
      })}
    >
      <ProductPrice />
      <ProductAction />
    </div>
  </article>
);

export const ProductDetail = ({ product, addToCart, children }: ProductDetailProps) => (
  <ProductDetailProvider product={product} addToCart={addToCart}>
    <main
      className={grid({
        gridTemplateColumns: {
          base: 'repeat(1, minmax(0, 1fr))',
          md: 'repeat(2, minmax(0, 1fr))',
        },
        gap: {
          base: '20px',
          md: '100px',
        },
      })}
    >
      {children}
    </main>
  </ProductDetailProvider>
);

ProductDetail.Root = ProductDetail;
ProductDetail.Image = ProductImage;
ProductDetail.Info = ProductInfo;
ProductDetail.displayName = 'ProductDetail';
