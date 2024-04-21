import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

export const orderHeaderStyle = flex({
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'gray100',
  padding: '8px 16px 4px 16px',
  borderRadius: '4px',
});
export const orderHeaderInfoStyle = flex({ gap: '5px', alignItems: 'center' });
export const orderHeaderActionsStyle = flex({
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: '10px',
});
export const orderNumberStyle = css({ color: 'gray600' });
export const orderProductsStyle = flex({ flexDirection: 'column', width: '100%', gap: '10px', marginTop: '10px' });
export const orderProductStyle = flex({ gap: '10px' });
export const productImageStyle = css({
  width: '120px',
  height: '120px',
  flex: '1 0 120px',
  objectFit: 'cover',
  borderRadius: '4px',
});
export const productInfoStyle = flex({
  width: '100%',
  justifyContent: 'space-between',
  flexDirection: {
    sm: 'row',
    base: 'column',
  },
  paddingX: '10px',
});
export const productNameAndPriceStyle = flex({ flexDirection: 'column', gap: '10px' });
export const productPriceStyle = flex({ gap: '2px', alignItems: 'center' });
export const productActionsStyle = flex({
  flexDirection: {
    sm: 'column',
    base: 'row',
  },
  justifyContent: {
    sm: 'center',
    base: 'flex-end',
  },
  gap: '4px',
});
export const cartIconStyle = css({ width: '20px', height: '20px', color: 'gray600' });
export const heartIconStyle = css({ width: '20px', height: '20px', color: 'teal200' });
