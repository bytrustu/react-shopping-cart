import { generateQueryKey } from '@/utils';

export const QUERY_KEYS = {
  PRODUCTS: generateQueryKey('products', 'list'),
  PRODUCT: generateQueryKey('products', 'item'),
  CARTS: generateQueryKey('carts', 'list'),
};