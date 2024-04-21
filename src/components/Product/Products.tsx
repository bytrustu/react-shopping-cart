import { PiBowlFoodDuotone } from 'react-icons/pi';
import { z } from 'zod';
import { grid } from '@styled-system/patterns';
import { Product } from './Product';
import { EmptyDescription, ProductSkeleton } from '@/components';
import { ProductSchema } from '@/types';

const ProductsPropsScheme = z.object({
  values: z.array(ProductSchema).optional(),
  loading: z.boolean().optional(),
  addCart: z.function().args(z.number()).returns(z.void()),
  moveToProductDetail: z.function().args(z.number()).returns(z.void()),
});

export type ProductsProps = z.infer<typeof ProductsPropsScheme>;

export const Products = ({ values, loading = false, addCart, moveToProductDetail }: ProductsProps) => (
  <>
    {values?.length === 0 && <EmptyDescription icon={<PiBowlFoodDuotone />} description="상품이 없습니다" />}
    <div
      className={grid({
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        rowGap: '40px',
        columnGap: '40px',
        maxWidth: '1200px',
        '@media (max-width: 1024px)': {
          maxWidth: 'unset',
        },
      })}
    >
      {values?.map((product) => (
        <Product
          key={product.id}
          {...product}
          liked={product.liked}
          addCart={addCart}
          moveToProductDetail={moveToProductDetail}
        />
      ))}
      {loading && <ProductsSkeleton />}
    </div>
  </>
);

const ProductsSkeleton = () => (
  <>
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
  </>
);

Products.displayName = 'Products';
