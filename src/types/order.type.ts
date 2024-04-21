import { z } from 'zod';
import { ProductSchema } from '@/types/product.type';

export const PaymentSchema = z.object({
  cardNumber: z.string(),
  cardBrand: z.string(),
  timestamp: z.number(),
});

export const OrderSchema = z.object({
  id: z.number(),
  products: z.array(ProductSchema.extend({ quantity: z.number() })),
  totalPrice: z.number(),
  payment: PaymentSchema.optional(),
});

export type Payment = z.infer<typeof PaymentSchema>;

export type Order = z.infer<typeof OrderSchema>;

export type OrderState = {
  state: {
    orders: Order[];
  };
  version: number;
};
