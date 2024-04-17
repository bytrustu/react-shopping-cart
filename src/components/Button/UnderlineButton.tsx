import { PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { Button } from '@/components';

type UnderlineButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

export const UnderlineButton = ({ children, onClick }: UnderlineButtonProps) => (
  <Button variant="ghost" className={underlineButtonStyle} onClick={onClick}>
    <div className={underlineTextStyle}>{children}</div>
  </Button>
);

const underlineButtonStyle = css({
  padding: 0,
  width: 'max-content',
});

const underlineTextStyle = css({
  display: 'inline',
  width: 'max-content',
  paddingBottom: '4px',
  borderBottom: '1px solid #bbb',
  color: 'gray800',
});
