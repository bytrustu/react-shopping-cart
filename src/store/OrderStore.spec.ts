import { act, renderHook } from '@testing-library/react';
import { useOrderStore } from './OrderStore';
import { products } from '@/mocks/data/shoppingCartWorld.ts';

const order1 = {
  id: 1000,
  products: [
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 },
  ],
  totalPrice: products[0].price + products[1].price * 2,
};

const order2 = {
  id: 1001,
  products: [{ ...products[2], quantity: 1 }],
  totalPrice: products[2].price,
};

afterEach(() => {
  localStorage.clear();
  const { result } = renderHook(() => useOrderStore());
  result.current.setOrders([]);
});

describe('useOrderStore', () => {
  test('주문 추가', () => {
    const { result } = renderHook(() => useOrderStore());

    act(() => {
      result.current.addOrder(order1);
    });

    expect(result.current.orders).toHaveLength(1);
    expect(result.current.orders[0]).toEqual(order1);
  });

  test('주문 설정', () => {
    const { result } = renderHook(() => useOrderStore());

    act(() => {
      result.current.setOrder(order1);
    });

    expect(result.current.orders).toHaveLength(1);
    expect(result.current.orders[0]).toEqual(order1);
  });

  test('여러 주문 설정', () => {
    const { result } = renderHook(() => useOrderStore());

    act(() => {
      result.current.setOrders([order1, order2]);
    });

    expect(result.current.orders).toHaveLength(2);
    expect(result.current.orders[0]).toEqual(order1);
    expect(result.current.orders[1]).toEqual(order2);
  });

  test('주문 ID로 주문 조회', () => {
    const { result } = renderHook(() => useOrderStore());

    act(() => {
      result.current.setOrders([order1, order2]);
    });

    const foundOrder = result.current.getOrderById(order2.id);

    expect(foundOrder).toEqual(order2);
  });

  test('주문 ID로 없는 주문 조회', () => {
    const { result } = renderHook(() => useOrderStore());

    act(() => {
      result.current.setOrders([order1, order2]);
    });

    const foundOrder = result.current.getOrderById(999);

    expect(foundOrder).toBeUndefined();
  });

  test('결제 정보 업데이트', () => {
    const { result } = renderHook(() => useOrderStore());

    act(() => {
      result.current.addOrder(order1);
      result.current.setOrder({
        ...order1,
        payment: {
          cardNumber: '123412341234',
          cardBrand: 'VISA',
          timestamp: Date.now(),
        },
      });
    });

    expect(result.current.orders[0].payment).toBeDefined();
    expect(result.current.orders[0].payment?.cardNumber).toBe('123412341234');
    expect(result.current.orders[0].payment?.cardBrand).toBe('VISA');
    expect(result.current.orders[0].payment?.timestamp).toBeDefined();
  });
});
