import { useEffect } from 'react';
import { ProductDetail } from '@/components/ProductDetail/ProductDetail.tsx';
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
    <ProductDetail.Root loading={productsQuery.isLoading}>
      {product && (
        <>
          <ProductDetail.Image imageUrl={product.imageUrl} name={product.name} />
          <ProductDetail.Info
            name={product.name}
            price={product.price}
            onAddToCart={() => {
              addToCart.open(productId);
            }}
          />
        </>
      )}
    </ProductDetail.Root>
  );
};
