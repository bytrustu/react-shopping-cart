import { delay, http, HttpResponse, PathParams } from 'msw';
import { products, orders } from './data/shoppingCartWorld';
import type { Cart, Order, Product } from '@/types';

const allProducts = new Map<number, Product>(products.map((product) => [product.id, product]));
let allCarts: Cart[] = [];
const allOrders = new Map<number, Order>(orders.map((order) => [order.id, order]));

const SERVER_DELAY_MS = 1500;

export const handlers = [
  http.get('/products', async ({ request }) => {
    await delay(SERVER_DELAY_MS);
    const url = new URL(request.url);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const limit = parseInt(url.searchParams.get('limit') || '8', 10);
    const productsArray = Array.from(allProducts.values());
    const paginatedProducts = productsArray.slice(offset, offset + limit);

    const total = productsArray.length;
    const nextCursor = offset + limit < total ? offset + limit : null;

    return HttpResponse.json({
      products: paginatedProducts,
      total,
      nextCursor,
    });
  }),
  http.get('/products/:id', async ({ params }) => {
    await delay(SERVER_DELAY_MS / 3);
    const product = allProducts.get(Number(params.id));
    if (product) {
      return HttpResponse.json(product);
    }
    return HttpResponse.json({ message: '상품 정보가 없습니다.' }, { status: 404 });
  }),
  http.delete('/products/:id', ({ params }) => {
    const deletedProduct = allProducts.get(Number(params.id));
    if (deletedProduct) {
      allProducts.delete(Number(params.id));
      return HttpResponse.json({ id: deletedProduct.id });
    }
    return HttpResponse.json({ message: '상품 정보가 없습니다.' }, { status: 404 });
  }),

  http.post<PathParams, { data: number[] }>('/carts', async ({ request }) => {
    const { data } = await request.json();
    const newCarts = data.reduce((acc: Cart[], id) => {
      const product = allProducts.get(id);
      if (product) {
        acc.push({
          ...product,
          quantity: 1,
        });
      }
      return acc;
    }, []);
    allCarts = newCarts;
    return HttpResponse.json(newCarts, { status: 201 });
  }),
  http.post<PathParams, { data: Cart }>('/cart', async ({ request }) => {
    await delay(SERVER_DELAY_MS);
    const { data: newCart } = await request.json();
    allCarts.push(newCart);
    return HttpResponse.json(newCart, { status: 201 });
  }),
  http.get('/carts', () => HttpResponse.json(Array.from(allCarts.values()))),
  http.delete('/carts/:cartId', async ({ params }) => {
    await delay(SERVER_DELAY_MS);
    const deletedCarts = allCarts.find((cart) => cart.id === Number(params.cartId));
    if (deletedCarts) {
      allCarts = allCarts.filter((cart) => cart.id !== deletedCarts.id);
      return HttpResponse.json({ id: deletedCarts.id });
    }
    return HttpResponse.json({ message: '장바구니에 상품 정보가 없습니다.' }, { status: 404 });
  }),

  http.get('/orders', () => HttpResponse.json(Array.from(allOrders.values()))),
  http.post<PathParams, Order>('/orders', async ({ request }) => {
    const newOrder = await request.json();
    const orderId = allOrders.size + 1;
    allOrders.set(orderId, { ...newOrder, id: orderId });
    return HttpResponse.json(allOrders.get(orderId), { status: 201 });
  }),
  http.get('/orders/:id', ({ params }) => {
    const order = allOrders.get(Number(params.id));
    if (order) {
      return HttpResponse.json(order);
    }
    return HttpResponse.json({ message: '주문 정보가 없습니다.' }, { status: 404 });
  }),
];
