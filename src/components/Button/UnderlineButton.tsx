import { PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { Button } from '@/components';

type UnderlineButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

export const UnderlineButton = ({ children, onClick }: UnderlineButtonProps) => (
  <Button variant="ghost" onClick={onClick} style={{ padding: 0, width: 'max-content' }}>
    <div className={underlineTextStyle}>{children}</div>
  </Button>
);

const underlineTextStyle = css({
  display: 'inline',
  width: 'max-content',
  padding: '0 0 4px 0',
  borderBottom: '1px solid #bbb',
  color: 'gray800',
  fontSize: '14px',
});
