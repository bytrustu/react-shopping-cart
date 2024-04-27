import { generateQueryKey, PRIMARY_QUERY_KEY } from './generateQueryKey';

describe('generateQueryKey', () => {
  const page = 'products';
  const name = 'getProducts';

  test('매개변수 없이 호출하면 PRIMARY_QUERY_KEY, page, name으로 구성된 쿼리 키를 반환한다', () => {
    const queryKey = generateQueryKey(page, name)();

    expect(queryKey).toEqual([PRIMARY_QUERY_KEY, 'products', 'getProducts']);
  });

  test('매개변수와 함께 호출하면 PRIMARY_QUERY_KEY, page, name, 직렬화된 매개변수로 구성된 쿼리 키를 반환한다', () => {
    const parameter = { category: 'electronics', limit: 10 };
    const queryKey = generateQueryKey(page, name)(parameter);

    expect(queryKey).toEqual([PRIMARY_QUERY_KEY, 'products', 'getProducts', '{"category":"electronics","limit":10}']);
  });

  test('매개변수가 빈 객체여도 PRIMARY_QUERY_KEY, page, name, 빈 객체의 직렬화된 문자열로 구성된 쿼리 키를 반환한다', () => {
    const parameter = {};
    const queryKey = generateQueryKey(page, name)(parameter);

    expect(queryKey).toEqual([PRIMARY_QUERY_KEY, 'products', 'getProducts', '{}']);
  });

  test('page와 name이 다른 값이면 해당 값들이 쿼리 키에 포함된다', () => {
    const customPage = 'orders';
    const customName = 'getOrderDetails';
    const parameter = { orderId: 123 };
    const queryKey = generateQueryKey(customPage, customName)(parameter);

    expect(queryKey).toEqual([PRIMARY_QUERY_KEY, 'orders', 'getOrderDetails', '{"orderId":123}']);
  });
});
