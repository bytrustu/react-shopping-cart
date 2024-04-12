import { z } from 'zod';
import { ProductSchema } from '@/types/product.type';

export const CartSchema = z.object({
  id: z.number(),
  product: ProductSchema,
});

export type Cart = z.infer<typeof CartSchema>;
