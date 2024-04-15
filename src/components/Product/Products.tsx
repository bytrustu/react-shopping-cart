import { z } from 'zod';
import { grid } from '@styled-system/patterns';
import { Product } from './Product';
import { ProductSkeleton } from './ProductSkeleton';
import { ProductSchema } from '@/types';

const ProductsPropsScheme = z.object({
  values: z.array(ProductSchema).optional(),
  loading: z.boolean().optional(),
  addCart: z.function().args(z.number()).returns(z.void()),
  moveToProductDetail: z.function().args(z.number()).returns(z.void()),
});

export type ProductsProps = z.infer<typeof ProductsPropsScheme>;

export const Products = ({ values, loading = false, addCart, moveToProductDetail }: ProductsProps) => (
  <div
    className={grid({
      gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
      rowGap: '80px',
      columnGap: '40px',
      maxWidth: '1200px',
      '@media (max-width: 1024px)': {
        maxWidth: 'unset',
      },
    })}
  >
    {values?.map((product) => (
      <Product key={product.id} {...product} addCart={addCart} moveToProductDetail={moveToProductDetail} />
    ))}
    {loading && Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)}
  </div>
);

Products.displayName = 'Products';
