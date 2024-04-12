import { http, HttpResponse, PathParams } from 'msw';
import { products, carts, orders } from '@/mocks/data';
import type { Cart, Order, Product } from '@/types';

const allProducts = new Map<number, Product>(products.map((product) => [product.id, product]));
const allCarts = new Map<number, Cart>(carts.map((cart) => [cart.id, cart]));
const allOrders = new Map<number, Order>(orders.map((order) => [order.id, order]));

export const handlers = [
  http.get('/products', () => HttpResponse.json(Array.from(allProducts.values()))),
  http.post<PathParams, Product>('/products', async ({ request }) => {
    const newProduct = await request.json();
    allProducts.set(newProduct.id, newProduct);
    return HttpResponse.json(newProduct, { status: 201 });
  }),
  http.get('/products/:id', ({ params }) => {
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

  http.get('/carts', () => HttpResponse.json(Array.from(allCarts.values()))),
  http.post<PathParams, Cart>('/carts', async ({ request }) => {
    const newCart = await request.json();
    const cartId = allCarts.size + 1;
    allCarts.set(cartId, { ...newCart, id: cartId });
    return HttpResponse.json(allCarts.get(cartId), { status: 201 });
  }),
  http.delete('/carts/:cartId', ({ params }) => {
    const deletedCartItem = allCarts.get(Number(params.cartId));
    if (deletedCartItem) {
      allCarts.delete(Number(params.cartId));
      return HttpResponse.json({});
    }
    return HttpResponse.json({ message: '장바구니 정보가 없습니다.' }, { status: 404 });
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
