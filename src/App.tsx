import axios from 'axios';
import { useEffect } from 'react';
import { css } from '@styled-system/css';
import { Product } from '@/types/product.type.ts';

const App = () => {
  const fetchProducts = async () => {
    const response = await axios.get<Product[]>('/products');
    const jsonData = response.data;
    console.log(jsonData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={css({
        color: 'mustard',
        fontWeight: 'bold',
        zIndex: 'overlay',
      })}
    >
      1234
    </div>
  );
};

export default App;
