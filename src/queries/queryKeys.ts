import { generateQueryKey } from '@/utils';

export const QUERY_KEYS = {
  PRODUCTS: generateQueryKey('products', 'list'),
  PRODUCT: generateQueryKey('products', 'item'),
  PRODUCT_CURATION: generateQueryKey('products', 'curation'),
  CARTS: generateQueryKey('carts', 'list'),
  ORDERS: generateQueryKey('orders', 'list'),
  LIKES: generateQueryKey('likes', 'list'),
};
