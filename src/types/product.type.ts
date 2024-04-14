import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
});

export const ProductsRequestParamScheme = z.object({
  offset: z.number(),
  limit: z.number(),
});

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  nextCursor: z.number().nullable(),
});

export const ProductWithCartSchema = ProductSchema.extend({
  addedToCart: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductsRequestParam = z.infer<typeof ProductsRequestParamScheme>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type ProductWithCart = z.infer<typeof ProductWithCartSchema>;
