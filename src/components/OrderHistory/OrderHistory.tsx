import { AiFillHeart } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { CiReceipt } from 'react-icons/ci';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import Skeleton from 'react-loading-skeleton';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import {
  orderHeaderStyle,
  orderHeaderInfoStyle,
  orderHeaderActionsStyle,
  orderNumberStyle,
  orderProductsStyle,
  orderProductStyle,
  productImageStyle,
  productInfoStyle,
  productNameAndPriceStyle,
  productPriceStyle,
  productActionsStyle,
  cartIconStyle,
  heartIconStyle,
} from './OrderHistory.style';
import { Divider, EmptyDescription, IconButton, Typography, UnderlineButton } from '@/components';
import { useAddToCart } from '@/hooks';
import { Order } from '@/types';
import { formatNumberWithCommas } from '@/utils';

type OrderHistoryProps = {
  values?: Order[];
  loading?: boolean;
};
type OrderHeaderProps = {
  value: Order;
  price: number;
};
type OrderProductsProps = {
  values: Order['products'];
};
type OrderProductProps = {
  value: Order['products'][number];
};

export const OrderHistory = ({ values, loading }: OrderHistoryProps) => {
  if (loading) {
    return (
      <div>
        <Skeleton width="100%" height="83px" />
        <Skeleton width="100%" height="380px" className={css({ marginTop: '10px' })} />
      </div>
    );
  }
  if (values?.length === 0) {
    return <EmptyDescription icon={<CiReceipt />} description="주문이 존재하지 않습니다." />;
  }

  return (
    <div className={flex({ flexDirection: 'column', gap: '24px' })}>
      {values?.map((order) => (
        <div key={order.id}>
          <OrderHeader value={order} price={order.totalPrice} />
          <OrderProducts values={order.products} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

const OrderHeader = ({ value, price }: OrderHeaderProps) => {
  const formattedDate = new Date(value.timestamp).toLocaleDateString('ko-KR');
  const formattedOrderId = value.id.toString();
  const priceString = `${formatNumberWithCommas(price)}원`;

  return (
    <header className={orderHeaderStyle}>
      <div className={orderHeaderInfoStyle}>
        <Typography variant="title">{formattedDate}</Typography>
        <BsDot />
        <Typography variant="body" className={orderNumberStyle}>
          주문번호: {formattedOrderId}
        </Typography>
      </div>
      <div className={orderHeaderActionsStyle}>
        <UnderlineButton>
          <Typography as="span" variant="body">
            결제상세 {priceString}원
          </Typography>
        </UnderlineButton>
        <UnderlineButton>
          <Typography as="span" variant="body">
            전체 상품 담기
          </Typography>
        </UnderlineButton>
      </div>
    </header>
  );
};

const OrderProducts = ({ values }: OrderProductsProps) => (
  <div className={orderProductsStyle}>
    {values.map((value, index) => (
      <OrderProduct key={index} value={value} />
    ))}
  </div>
);

const OrderProduct = ({ value }: OrderProductProps) => {
  const addToCart = useAddToCart();
  return (
    <div className={orderProductStyle}>
      <img src={value.imageUrl} alt="주문 상품 이미지" className={productImageStyle} />
      <div className={productInfoStyle}>
        <div className={productNameAndPriceStyle}>
          <Typography variant="title">{value.name}</Typography>
          <div className={productPriceStyle}>
            <Typography variant="body">{formatNumberWithCommas(value.price)}원</Typography>
            <BsDot />
            <Typography variant="body">{value.quantity}개</Typography>
          </div>
        </div>
        <div className={productActionsStyle}>
          <IconButton
            icon={<PiShoppingCartSimpleLight className={cartIconStyle} />}
            onClick={() => addToCart.open(value.id)}
          />
          <IconButton icon={<AiFillHeart className={heartIconStyle} />} />
        </div>
      </div>
    </div>
  );
};

OrderHistory.displayName = 'OrderHistory';
