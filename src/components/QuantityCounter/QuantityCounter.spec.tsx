import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { QuantityCounter } from '@/components';

describe('QuantityCounter 컴포넌트', () => {
  it('수량 증가 버튼 클릭 시 핸들러가 호출되어야 함', () => {
    const incrementMock = vi.fn();
    const { getByLabelText } = render(<QuantityCounter value={1} increment={incrementMock} decrement={() => {}} />);

    const incrementButton = getByLabelText('수량 증가');
    fireEvent.click(incrementButton);
    expect(incrementMock).toHaveBeenCalled();
  });

  it('수량 감소 버튼 클릭 시 핸들러가 호출되어야 함', () => {
    const decrementMock = vi.fn();
    const { getByLabelText } = render(<QuantityCounter value={2} increment={() => {}} decrement={decrementMock} />);

    const decrementButton = getByLabelText('수량 감소');
    fireEvent.click(decrementButton);
    expect(decrementMock).toHaveBeenCalled();
  });
});
