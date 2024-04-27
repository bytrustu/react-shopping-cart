import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { UnderlineButton } from '@/components';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { useAlert } from '@/hooks';
import { Cart } from '@/types';

type CartHeaderProps = {
  checkValues: Cart[];
  allChecked: boolean;
  toggleAllProductsCheck: () => void;
  removeProducts: (productIds: number[]) => void;
};

export const CartHeader = ({ checkValues, allChecked, toggleAllProductsCheck, removeProducts }: CartHeaderProps) => {
  const alert = useAlert();
  const productIds = checkValues.map((product) => product.product.id);

  const handleRemoveProducts = async () => {
    if (productIds.length === 0) {
      return;
    }
    const confirmed = await alert.open({
      message: '선택한 상품을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    });

    if (!confirmed) {
      return;
    }
    removeProducts(productIds);
  };

  return (
    <header
      className={flex({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        marginTop: '20px',
      })}
    >
      <div
        className={flex({
          justifyContent: 'space-between',
          width: '278px',
          flexGrow: 1,
        })}
      >
        <Checkbox onChange={toggleAllProductsCheck} checked={allChecked} label="전체선택" />
        <UnderlineButton onClick={handleRemoveProducts}>선택 삭제</UnderlineButton>
      </div>
      <div
        className={css({
          width: '423px',
          display: {
            base: 'none',
            lg: 'block',
          },
        })}
      />
    </header>
  );
};

CartHeader.displayName = 'CartHeader';
