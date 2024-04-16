import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { EmptyDescription } from '@/components';

export const CartPage = () => (
  <div>
    <EmptyDescription icon={<PiShoppingCartSimpleLight />} description="장바구니가 비었습니다." />
  </div>
);
