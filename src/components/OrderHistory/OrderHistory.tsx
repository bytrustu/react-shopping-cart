import { AiFillHeart } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { CiReceipt } from 'react-icons/ci';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
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
  orders: Order[];
};
type OrderHeaderProps = {
  order: Order;
  totalPrice: number;
};
type OrderProductsProps = {
  products: Order['products'];
};
type OrderProductProps = {
  product: Order['products'][number];
};

export const OrderHistory = ({ orders }: OrderHistoryProps) => {
  if (orders.length === 0) {
    return <EmptyDescription icon={<CiReceipt />} description="주문이 존재하지 않습니다." />;
  }

  return (
    <div className={flex({ flexDirection: 'column', gap: '24px' })}>
      {orders.map((order) => (
        <div key={order.id}>
          <OrderHeader order={order} totalPrice={order.totalPrice} />
          <OrderProducts products={order.products} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

const OrderHeader = ({ order, totalPrice }: OrderHeaderProps) => {
  const formattedDate = new Date(order.timestamp).toLocaleDateString('ko-KR');
  const formattedOrderId = order.id.toString();
  const priceString = `${formatNumberWithCommas(totalPrice)}원`;

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

const OrderProducts = ({ products }: OrderProductsProps) => (
  <div className={orderProductsStyle}>
    {products.map((product, index) => (
      <OrderProduct key={index} product={product} />
    ))}
  </div>
);

const OrderProduct = ({ product }: OrderProductProps) => {
  const addToCart = useAddToCart();
  return (
    <div className={orderProductStyle}>
      <img src={product.imageUrl} alt="주문 상품 이미지" className={productImageStyle} />
      <div className={productInfoStyle}>
        <div className={productNameAndPriceStyle}>
          <Typography variant="title">{product.name}</Typography>
          <div className={productPriceStyle}>
            <Typography variant="body">{formatNumberWithCommas(product.price)}원</Typography>
            <BsDot />
            <Typography variant="body">{product.quantity}개</Typography>
          </div>
        </div>
        <div className={productActionsStyle}>
          <IconButton
            icon={<PiShoppingCartSimpleLight className={cartIconStyle} />}
            onClick={() => addToCart.open(product.id)}
          />
          <IconButton icon={<AiFillHeart className={heartIconStyle} />} />
        </div>
      </div>
    </div>
  );
};

OrderHistory.displayName = 'OrderHistory';
