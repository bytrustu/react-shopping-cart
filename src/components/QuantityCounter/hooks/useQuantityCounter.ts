import { useState } from 'react';

type UseQuantityCounterProps = {
  initialQuantity?: number;
  min?: number;
  max?: number;
};

export const useQuantityCounter = ({ initialQuantity = 1, min = 1, max = 999 }: UseQuantityCounterProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    if (quantity < max) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const reset = () => {
    setQuantity(initialQuantity);
  };

  return {
    value: quantity,
    increment,
    decrement,
    reset,
    min,
    max,
  };
};
