import { useNavigate } from '@tanstack/react-router';
import { Products } from '@/components';
import { useAddToCart, useProductsData } from '@/hooks';

export const ProductsPage = () => {
  const navigate = useNavigate({ from: '/' });
  const products = useProductsData();
  const addToCart = useAddToCart();

  const moveToProductDetail = (id: number) => {
    navigate({
      to: '/product/$id',
      params: { id: String(id) },
    });
  };

  return (
    <>
      <Products
        values={products.value}
        loading={products.loading}
        addCart={addToCart.open}
        moveToProductDetail={moveToProductDetail}
      />
      {products.fetchedAfterMount && <div ref={products.ref} />}
    </>
  );
};
