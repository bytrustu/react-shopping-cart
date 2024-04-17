import { z } from 'zod';
import { ProductSchema } from '@/types/product.type';

export const OrderDetailSchema = ProductSchema.extend({ quantity: z.number() });
export type OrderDetail = z.infer<typeof OrderDetailSchema>;

export const OrderSchema = z.object({
  id: z.number(),
  products: z.array(OrderDetailSchema),
  totalPrice: z.number(),
  timestamp: z.number(),
});
export type Order = z.infer<typeof OrderSchema>;
