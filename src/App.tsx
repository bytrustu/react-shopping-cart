import axios from 'axios';
import { useEffect } from 'react';
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

  return <>1234</>;
};

export default App;
