import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import { ProductDetail } from '@/components';
import { useAddToCart } from '@/hooks';
import { useProductQuery } from '@/queries';
import { Route } from '@/routes/product_.$id.tsx';
import { ProductSchema } from '@/types';

export const ProductDetailPage = () => {
  const addToCart = useAddToCart();
  const { id } = Route.useParams();
  const productId = Number(id);

  const productsQuery = useProductQuery({ id: productId });
  const product = productsQuery.data && ProductSchema.parse(productsQuery.data);

  useEffect(() => addToCart.close, []);

  return (
    <ProductDetail.Root loading={productsQuery.isLoading} product={product} addToCart={addToCart.open}>
      <ErrorBoundary fallback={<Skeleton height="500px" />} resetKeys={['productDetail', product?.imageUrl]}>
        <ProductDetail.Image />
      </ErrorBoundary>
      <ErrorBoundary fallback={<Skeleton height="500px" />} resetKeys={['productDetail', product?.price]}>
        <ProductDetail.Info />
      </ErrorBoundary>
    </ProductDetail.Root>
  );
};
