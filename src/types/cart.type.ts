import { z } from 'zod';
import { ProductSchema } from '@/types/product.type';

export const CartSchema = z.object({
  product: ProductSchema,
  quantity: z.number(),
  checked: z.boolean().optional(),
});

export type Cart = z.infer<typeof CartSchema>;

export type CartState = {
  state: {
    cartProducts: Cart[];
  };
  version: number;
};
