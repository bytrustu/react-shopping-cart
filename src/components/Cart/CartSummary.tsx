import { PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { Divider, Image, Typography } from '@/components';
import { formatNumberWithCommas } from '@/utils';

type CartSummaryProps = {
  totalPrice: number;
  productImages: string[];
};

export const CartSummary = ({ children, totalPrice = 0, productImages = [] }: PropsWithChildren<CartSummaryProps>) => {
  const headingString = `전체 상품 (${productImages.length})`;
  const totalPriceString = `${formatNumberWithCommas(totalPrice)}원`;

  return (
    <section className={cartSummaryStyle}>
      <div className={cartSummaryContentStyle}>
        <div className={productImagesStyle}>
          <Typography as="h3" variant="body">
            {headingString}
          </Typography>
          <div className={productImageWrapperStyle}>
            {productImages.map((imageUrl) => (
              <Image key={imageUrl} src={imageUrl} alt="상품 이미지" className={productImageStyle} />
            ))}
          </div>
          <Divider />
        </div>
        <div className={priceInfoStyle}>
          <Typography className={expectedPaymentStyle} variant="body">
            결제금액
          </Typography>
          <Typography variant="title" className={totalPriceStyle}>
            {totalPriceString}
          </Typography>
        </div>
      </div>
      {children}
    </section>
  );
};

CartSummary.displayName = 'CartSummary';

const cartSummaryStyle = css({
  position: {
    base: 'fixed',
    lg: 'static',
  },
  bottom: {
    base: '0',
    lg: 'auto',
  },
  left: {
    base: '0',
    lg: 'auto',
  },
  width: {
    base: '100%',
    lg: '280px',
  },
  minWidth: '375px',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '10px',
  border: '1px solid #d1d1d1',
  borderRadius: '4px',
  backgroundColor: 'white',
});

const cartSummaryContentStyle = flex({
  flexDirection: 'column',
  padding: '20px',
  gap: '20px',
});

const productImagesStyle = flex({
  display: {
    base: 'none',
    lg: 'block',
  },
  flexDirection: 'column',
});

const productImageWrapperStyle = flex({
  flexWrap: 'wrap',
  gap: '6px',
  marginY: '10px',
});

const productImageStyle = css({
  width: '61px',
  height: '61px',
  borderRadius: '4px',
});

const priceInfoStyle = flex({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const expectedPaymentStyle = css({ lineHeight: 2 });
const totalPriceStyle = css({ color: 'teal200' });

CartSummary.displayName = 'CartSummary';
