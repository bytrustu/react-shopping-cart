import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import { Product } from './Product';
import { products } from '@/mocks/data/shoppingCartWorld.ts';
import { formatNumberWithCommas } from '@/utils';

const queryClient = new QueryClient();

describe('Product 컴포넌트', () => {
  const productProps = {
    ...products[0],
    liked: true,
    addCart: vi.fn(),
    moveToProductDetail: vi.fn(),
  };

  const renderProduct = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Product {...productProps} />
      </QueryClientProvider>,
    );

  it('상품 정보가 정확하게 렌더링되어야 한다', () => {
    renderProduct();

    expect(screen.getByText(productProps.name)).toBeInTheDocument();
    expect(screen.getByText(`${formatNumberWithCommas(productProps.price)}원`)).toBeInTheDocument();
  });

  it('상품 상세 페이지 이동 함수가 클릭 시 호출되어야 한다', () => {
    renderProduct();

    const detailButton = screen.getByText(productProps.name);
    fireEvent.click(detailButton);
    expect(productProps.moveToProductDetail).toHaveBeenCalledWith(productProps.id);
  });

  it('장바구니 추가 버튼이 클릭 시 호출되어야 한다', () => {
    renderProduct();

    const cartButton = screen.getByRole('button', { name: '장바구니 추가 버튼' }); // IconButton에 aria-label 추가 권장
    fireEvent.click(cartButton);
    expect(productProps.addCart).toHaveBeenCalledWith(productProps.id);
  });

  it('찜 버튼 클릭 시 상태가 토글되어야 한다', async () => {
    renderProduct();
    const likeButton = screen.getByRole('button', { name: '찜 toggle 버튼' });
    fireEvent.click(likeButton);
  });
});
