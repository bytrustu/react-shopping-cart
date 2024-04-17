import { z } from 'zod';
import { ProductSchema } from '@/types/product.type';

export const CartSchema = ProductSchema.extend({ quantity: z.number().optional() });

export type Cart = z.infer<typeof CartSchema>;
