import { BiMinus, BiPlus } from 'react-icons/bi';
import { flex } from '@styled-system/patterns';
import { Button } from '../Button';

type QuantityCounterProps = {
  value: number;
  min?: number;
  max?: number;
  increment: () => void;
  decrement: () => void;
};

export const QuantityCounter = ({ value, increment, decrement, min = 1, max = 999 }: QuantityCounterProps) => {
  const handleDecrement = () => {
    if (value > min) {
      decrement();
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      increment();
    }
  };

  return (
    <div className={containerStyle}>
      <Button
        variant="ghost"
        className={buttonStyle}
        style={{ borderRadius: 0 }}
        onClick={handleDecrement}
        aria-label="수량 감소"
      >
        <BiMinus width="15px" height="15px" color="#aaa" />
      </Button>
      <input className={inputStyle} type="text" name="quantity" title="수량 입력" value={value} readOnly />
      <Button
        variant="ghost"
        className={buttonStyle}
        style={{ borderRadius: 0 }}
        onClick={handleIncrement}
        aria-label="수량 증가"
      >
        <BiPlus width="15px" height="15px" color="#aaa" />
      </Button>
    </div>
  );
};

const containerStyle = flex({
  width: '100px',
  height: '30px',
});

const buttonStyle = flex({
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #d1d1d1',
  padding: '6px',
});

const inputStyle = flex({
  width: '40px',
  height: '30px',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #d1d1d1',
  borderLeft: 'none',
  borderRight: 'none',
  padding: 0,
  textAlign: 'center',
  color: 'gray.500',
});
