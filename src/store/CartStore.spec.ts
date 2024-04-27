import { act, renderHook } from '@testing-library/react';
import { useCartStore } from './CartStore';
import { products } from '@/mocks/data/shoppingCartWorld.ts';

afterEach(() => {
  localStorage.clear();
  const { result } = renderHook(() => useCartStore());
  result.current.clearCart();
});

describe('useCartStore', () => {
  test('장바구니에 상품 추가', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
    });

    expect(result.current.cartProducts).toHaveLength(1);
    expect(result.current.cartProducts[0].product).toEqual(products[0]);
    expect(result.current.cartProducts[0].quantity).toBe(1);
    expect(result.current.cartProducts[0].checked).toBe(true);
  });

  test('장바구니에 이미 존재하는 상품 추가', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
      result.current.addProduct(products[0]);
    });

    expect(result.current.cartProducts).toHaveLength(1);
    expect(result.current.cartProducts[0].quantity).toBe(2);
  });

  test('장바구니 상품 설정', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.setCartProducts([
        { product: products[0], quantity: 1, checked: true },
        { product: products[1], quantity: 2, checked: false },
      ]);
    });

    expect(result.current.cartProducts).toHaveLength(2);
    expect(result.current.cartProducts[0].product).toEqual(products[0]);
    expect(result.current.cartProducts[1].product).toEqual(products[1]);
  });

  test('장바구니 상품 삭제', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.setCartProducts([
        { product: products[0], quantity: 1, checked: false },
        { product: products[1], quantity: 1, checked: false },
      ]);
      result.current.removeProduct(products[0].id);
    });

    expect(result.current.cartProducts).toHaveLength(1);
    expect(result.current.cartProducts[0].product).toEqual(products[1]);
  });

  test('장바구니 체크 항목 삭제', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
      result.current.addProduct(products[1]);
      result.current.addProduct(products[2]);
      result.current.removeProducts([products[1].id, products[2].id]);
    });

    expect(result.current.getCartProducts()).toHaveLength(1);
    expect(result.current.cartProducts[0].product).toEqual(products[0]);
  });

  test('장바구니 상품 수량 업데이트', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
    });

    expect(result.current.getCartProduct(products[0].id)?.quantity).toBe(1);
  });

  test('장바구니 상품 체크 토글', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
      result.current.toggleProductCheck(products[0].id);
    });

    expect(result.current.cartProducts[0].checked).toBe(false);
  });

  test('장바구니 상품 전체 체크 토글', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
      result.current.addProduct(products[1]);
      result.current.toggleAllProductsCheck();
    });

    expect(result.current.cartProducts[0].checked).toBe(false);
    expect(result.current.cartProducts[1].checked).toBe(false);
  });

  test('장바구니 상품 가져오기', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
    });

    const cartProduct = result.current.getCartProduct(products[0].id);
    expect(cartProduct?.product).toEqual(products[0]);
  });

  test('장바구니 상품 체크된 것만 삭제', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(products[0]);
      result.current.addProduct(products[1]);
      result.current.toggleProductCheck(products[0].id);
      const checkedProducts = result.current.getCartProducts().filter((item) => item.checked);
      result.current.removeProducts(checkedProducts.map((item) => item.product.id));
    });

    expect(result.current.cartProducts).toHaveLength(1);
    expect(result.current.cartProducts[0].product).toEqual(products[0]);
  });
});
