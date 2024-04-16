import { CiReceipt } from 'react-icons/ci';
import { EmptyDescription } from '@/components';

export const OrdersPage = () => (
  <div>
    <EmptyDescription icon={<CiReceipt />} description="주문이 존재하지 않습니다." />
  </div>
);
