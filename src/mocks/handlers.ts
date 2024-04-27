import { delay, http, HttpResponse, PathParams } from 'msw';
import { products, orders, carts } from './data/shoppingCartWorld';
import { Cart, Order, Product, ProductSchema } from '@/types';

const allProducts = new Map<number, Product>(products.map((product) => [product.id, product]));
const allCarts = new Map<number, Cart>(carts.map((cart) => [cart.product.id, cart]));
const allOrders = new Map<number, Order>(orders.map((order) => [order.id, order]));

const SERVER_DELAY_MS = 1_000;
const START_ORDER_ID = 1_000;

export const handlers = [
  http.get('/products', async ({ request }) => {
    await delay(SERVER_DELAY_MS / 200);
    const url = new URL(request.url);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const limit = parseInt(url.searchParams.get('limit') || '8', 10);

    const productsArray = Array.from(allProducts.values()).map((product) => ({
      ...product,
    }));
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
      return HttpResponse.json({
        ...product,
      });
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

  http.post<PathParams, { data: Cart }>('/cart', async ({ request }) => {
    const { data: newCart } = await request.json();

    const existingCart = allCarts.get(newCart.product.id);
    if (existingCart) {
      allCarts.set(newCart.product.id, {
        ...existingCart,
        quantity: existingCart.quantity + newCart.quantity,
      });
    } else {
      allCarts.set(newCart.product.id, newCart);
    }
    return HttpResponse.json(Array.from(allCarts.values()), { status: 201 });
  }),
  http.post<PathParams, { data: Cart[] }>('/carts', async ({ request }) => {
    const { data: newCarts } = await request.json();

    newCarts.forEach((newCart) => {
      allCarts.set(newCart.product.id, newCart);
    });

    return HttpResponse.json(Array.from(allCarts.values()), { status: 201 });
  }),
  http.get('/carts', () => {
    const carts = Array.from(allCarts.values()).map((cart) => {
      const product = allProducts.get(cart.product.id);
      return {
        ...cart,
        product: product ? { ...product } : null,
      };
    });
    return HttpResponse.json(carts);
  }),
  http.delete('/carts/:cartId', async ({ params }) => {
    const cartId = Number(params.cartId);
    const deletedCart = allCarts.get(cartId);
    if (deletedCart) {
      allCarts.delete(cartId);
      return HttpResponse.json({ id: cartId });
    }
    return HttpResponse.json({ message: '장바구니에 상품 정보가 없습니다.' }, { status: 404 });
  }),
  http.post<PathParams, { data: { ids: number[] } }>('/carts/remove', async ({ request }) => {
    const {
      data: { ids: cartIds },
    } = await request.json();
    if (cartIds) {
      cartIds.forEach((cartId) => allCarts.delete(cartId));
      return HttpResponse.json({ ids: cartIds });
    }
    return HttpResponse.json({ message: '삭제할 상품 정보가 없습니다.' }, { status: 404 });
  }),

  http.get('/orders', async () => {
    await delay(SERVER_DELAY_MS);
    const orders: Order[] = Array.from(allOrders.values()).map((order) => ({
      ...order,
      products: order.products.map((orderProduct) => {
        const product = allProducts.get(orderProduct.id);
        return product ? { ...product, ...orderProduct } : orderProduct;
      }),
    }));
    return HttpResponse.json(orders);
  }),
  http.post<PathParams, { data: Pick<Order, 'products' | 'totalPrice'> }>('/order', async ({ request }) => {
    const { data: newOrder } = await request.json();
    const orderId = allOrders.size + START_ORDER_ID;
    allOrders.set(orderId, {
      id: orderId,
      products: newOrder.products.map((product) => ({
        ...product,
        imageUrl: allProducts.get(product.id)?.imageUrl || '',
      })),
      totalPrice: newOrder.totalPrice,
    });
    newOrder.products.forEach((cart) => allCarts.delete(cart.id));
    return HttpResponse.json(allOrders.get(orderId), { status: 201 });
  }),
  http.post<PathParams, { data: Order[] }>('/orders', async ({ request }) => {
    const { data: newOrders } = await request.json();
    allOrders.clear();
    newOrders.forEach((newOrder) => {
      allOrders.set(newOrder.id, newOrder);
    });
    return HttpResponse.json(
      Array.from(allOrders.values()).sort((a, b) => b.id - a.id),
      { status: 201 },
    );
  }),
  http.put<PathParams, { data: Order }>('/orders/:id', async ({ params, request }) => {
    const { data: updatedOrder } = await request.json();
    const orderId = Number(params.id);
    const existingOrder = allOrders.get(orderId);
    if (existingOrder) {
      allOrders.set(orderId, updatedOrder);
      return HttpResponse.json(updatedOrder);
    }
    return HttpResponse.json({ message: '주문 정보가 없습니다.' }, { status: 404 });
  }),
  http.get('/orders/:id', ({ params }) => {
    const order = allOrders.get(Number(params.id));
    if (order) {
      return HttpResponse.json(order);
    }
    return HttpResponse.json({ message: '주문 정보가 없습니다.' }, { status: 404 });
  }),

  http.post<PathParams, { data: { productId: number } }>('/products/like', async ({ request }) => {
    const {
      data: { productId },
    } = await request.json();
    if (!productId || !allProducts.has(productId)) {
      return HttpResponse.json({ message: '찜 할 상품 정보가 없습니다.' }, { status: 404 });
    }
    allProducts.set(productId, { ...ProductSchema.parse(allProducts.get(productId)), liked: true });
    return HttpResponse.json(productId);
  }),
  http.delete('/products/like/:productId', ({ params }) => {
    const productId = Number(params.productId);
    if (allProducts.has(productId)) {
      allProducts.set(productId, { ...ProductSchema.parse(allProducts.get(productId)), liked: false });
      return HttpResponse.json(productId);
    }
    return HttpResponse.json({ message: '찜 해제할 상품 정보가 없습니다.' }, { status: 404 });
  }),
  http.put<PathParams, { data: { productIds: number[] } }>('/products/like', async ({ request }) => {
    const {
      data: { productIds },
    } = await request.json();
    productIds.forEach((productId) => {
      if (allProducts.has(productId)) {
        allProducts.set(productId, { ...ProductSchema.parse(allProducts.get(productId)), liked: true });
      }
    });
    return HttpResponse.json(Array.from(allProducts.values()));
  }),

  http.get('/curation', async () => {
    const cartProducts = Array.from(allCarts.values());
    const cartCategories = [...new Set(cartProducts.map((cart) => cart.product.category))];
    const likedProducts = Array.from(allProducts.values()).filter((product) => product.liked);

    const allProductsArray = Array.from(allProducts.values());
    const productsInCart = new Set(cartProducts.map((cart) => cart.product.id));

    const curatedProducts = cartCategories.slice(0, 3).reduce((products, category) => {
      const categoryProducts = allProductsArray.filter(
        (product) => product.category === category && !productsInCart.has(product.id),
      );
      return [...products, ...categoryProducts.slice(0, 3)];
    }, [] as Product[]);

    const likedProductsNotInCart = likedProducts.filter((product) => !productsInCart.has(product.id));
    const selectedLikedProducts = likedProductsNotInCart.slice(0, 3);
    curatedProducts.push(...selectedLikedProducts);

    const remainingProducts = allProductsArray.filter(
      (product) => !productsInCart.has(product.id) && !curatedProducts.includes(product),
    );
    const randomProducts = getRandomElements(remainingProducts, 10 - curatedProducts.length);
    const finalCuratedProducts = [...curatedProducts, ...randomProducts].slice(0, 10);

    return HttpResponse.json(finalCuratedProducts);
  }),
];

const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = array.slice();
  let i = array.length;
  const min = i - count;
  let temp: T;
  let index: number;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};
