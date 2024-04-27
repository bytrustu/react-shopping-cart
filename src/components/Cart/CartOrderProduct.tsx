import { BiTrash } from 'react-icons/bi';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { IconButton, QuantityCounter, Typography, Image, Checkbox, LikeIconButton } from '@/components';
import { CART_MAX_QUANTITY_VALUE } from '@/constants';
import { useAlert } from '@/hooks';
import { useRemoveProductFromCartMutation } from '@/queries';
import { useCartStore } from '@/store';
import { Cart } from '@/types';
import { formatNumberWithCommas } from '@/utils';

type CartProductProps = {
  value: Cart;
};

type ProductImageProps = {
  processedOrder: boolean;
  checked?: boolean;
  imageUrl: string;
  onCheckboxChange: () => void;
};

type ProductInfoProps = {
  name: string;
  price: string;
  quantity: number;
  orderProcess: boolean;
  liked: boolean;
  productId: number;
  onDeleteCartProduct: () => void;
  onQuantityChange: (quantity: number) => void;
};

export const CartOrderProduct = ({ value }: CartProductProps) => {
  const { product, quantity, checked } = value;
  const alert = useAlert();
  const cartStore = useCartStore();
  const removeProductToCartMutation = useRemoveProductFromCartMutation();

  const productPrice = `${formatNumberWithCommas(product.price * quantity)}원`;
  const processedOrder = checked === undefined;

  const handleCheckboxChange = () => {
    cartStore.toggleProductCheck(product.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    cartStore.updateProductQuantity(product.id, newQuantity);
  };

  const handleDeleteCartProduct = async () => {
    const isConfirmed = await alert.open({
      message: `"${product.name}"\n상품을 삭제하시겠습니까?`,
      confirmText: '삭제',
      cancelText: '취소',
    });
    if (isConfirmed) {
      cartStore.removeProduct(product.id);
      removeProductToCartMutation.mutate(product.id);
    }
  };

  return (
    <li className={cartProductListItemStyle}>
      <ProductImage
        processedOrder={processedOrder}
        checked={checked}
        imageUrl={product.imageUrl}
        onCheckboxChange={handleCheckboxChange}
      />
      <ProductInfo
        name={product.name}
        price={productPrice}
        quantity={quantity}
        orderProcess={processedOrder}
        liked={Boolean(product.liked)}
        productId={product.id}
        onDeleteCartProduct={handleDeleteCartProduct}
        onQuantityChange={handleQuantityChange}
      />
    </li>
  );
};

const ProductImage = ({ processedOrder, checked, imageUrl, onCheckboxChange }: ProductImageProps) => (
  <div className={productImageContainerStyle}>
    {!processedOrder ? (
      <Checkbox checked={checked} onChange={onCheckboxChange} className={productImageCheckboxStyle} />
    ) : null}
    <Image src={imageUrl} alt="주문 상품 이미지" className={productImageStyle} />
  </div>
);

const ProductInfo = ({
  name,
  price,
  quantity,
  orderProcess,
  liked,
  productId,
  onDeleteCartProduct,
  onQuantityChange,
}: ProductInfoProps) => (
  <div className={productInfoContainerStyle}>
    <Typography className={productNameStyle}>{name}</Typography>
    <div className={productInfoRightContainerStyle}>
      {!orderProcess ? (
        <div className={productActionButtonsContainerStyle}>
          <LikeIconButton productId={productId} liked={liked} />
          <IconButton
            variant="ghost"
            className={deleteButtonStyle}
            icon={<BiTrash className={deleteButtonIconStyle} />}
            onClick={onDeleteCartProduct}
          />
        </div>
      ) : null}
      <div className={productPriceAndQuantityContainerStyle}>
        <div className={productPriceContainerStyle}>
          <Typography className={productPriceStyle}>{price}</Typography>
        </div>
        {orderProcess ? (
          <Typography className={productQuantityStyle}>{quantity}개</Typography>
        ) : (
          <QuantityCounter
            value={quantity}
            min={1}
            max={CART_MAX_QUANTITY_VALUE}
            increment={() => onQuantityChange(quantity + 1)}
            decrement={() => onQuantityChange(quantity - 1)}
          />
        )}
      </div>
    </div>
  </div>
);

CartOrderProduct.displayName = 'CartOrderProduct';

const cartProductListItemStyle = flex({ gap: '10px' });

const productImageContainerStyle = flex({
  position: 'relative',
  flex: {
    base: '0 0 80px',
    sm: '0 0 120px',
  },
});

const productImageCheckboxStyle = css({
  position: 'absolute',
  top: '4px',
  left: '4px',
});

const productImageStyle = css({
  width: {
    base: '80px',
    sm: '120px',
  },
  height: {
    base: '80px',
    sm: '120px',
  },
  flex: '1 0 120px !important',
  objectFit: 'cover',
  borderRadius: '4px',
  border: 'none',
});

const productInfoContainerStyle = flex({
  position: 'relative',
  flex: '1 0 0',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: {
    base: '4px',
    sm: '10px',
  },
});

const productNameStyle = css({
  fontSize: {
    base: '14px',
    sm: '18px',
  },
  paddingRight: '12px',
});

const productInfoRightContainerStyle = flex({
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const productActionButtonsContainerStyle = flex({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '4px',
});

const deleteButtonStyle = css({ width: '20px', height: '20px', padding: 0 });
const deleteButtonIconStyle = css({ width: '20px', height: '20px', color: 'gray600' });

const productPriceAndQuantityContainerStyle = flex({
  position: {
    base: 'absolute',
    sm: 'static',
  },
  bottom: {
    base: '4px',
    sm: 'unset',
  },
  left: {
    base: '0',
    sm: 'unset',
  },
  width: '100%',
  paddingLeft: {
    base: '4px',
    sm: '0',
  },
  flexDirection: {
    base: 'row',
    sm: 'column',
  },
  alignItems: 'flex-end',
  justifyContent: {
    base: 'space-between',
    sm: 'flex-start',
  },
  gap: '10px',
});

const productPriceContainerStyle = flex({
  gap: '2px',
  justifyContent: {
    base: 'flex-start',
    sm: 'flex-end',
  },
  alignItems: 'center',
  width: {
    base: '150px',
    sm: '100%',
  },
  overflow: {
    base: 'hidden',
    sm: 'visible',
  },
});

const productPriceStyle = css({
  fontSize: {
    base: '14px',
    sm: '18px',
  },
});

const productQuantityStyle = css({
  fontSize: {
    base: '14px',
    sm: '18px',
  },
});
