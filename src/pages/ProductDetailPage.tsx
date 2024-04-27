import { ErrorBoundary } from 'react-error-boundary';
import { PiBowlFoodDuotone } from 'react-icons/pi';
import Skeleton from 'react-loading-skeleton';
import { EmptyDescription, ProductDetail } from '@/components';
import { useAddToCart } from '@/hooks';
import { useProductQuery } from '@/queries';
import { Route } from '@/routes/product_.$id.tsx';
import { ProductSchema } from '@/types';

export const ProductDetailPage = () => {
  const addToCart = useAddToCart();
  const { id } = Route.useParams();
  const productId = Number(id);
  const productsQuery = useProductQuery({ id: productId });

  if (!productsQuery.isLoading && !productsQuery.data) {
    return <EmptyDescription icon={<PiBowlFoodDuotone />} description="존재하지 않는 상품입니다." />;
  }

  const product = productsQuery.data && ProductSchema.parse(productsQuery.data);

  return (
    <ProductDetail.Root loading={productsQuery.isLoading} product={product} addToCart={addToCart.single}>
      <ErrorBoundary fallback={<Skeleton height="680px" />} resetKeys={['productDetail', product?.imageUrl]}>
        <ProductDetail.Image />
      </ErrorBoundary>
      <ErrorBoundary fallback={<Skeleton height="680px" />} resetKeys={['productDetail', product?.price]}>
        <ProductDetail.Info />
      </ErrorBoundary>
    </ProductDetail.Root>
  );
};
