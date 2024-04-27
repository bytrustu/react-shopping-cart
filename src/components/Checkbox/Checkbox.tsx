import { clsx } from 'clsx';
import { forwardRef, HTMLProps } from 'react';
import { css } from '@styled-system/css';

const checkboxContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: 'white',
});

const checkboxInputStyle = css({
  appearance: 'none',
  width: '18px',
  height: '18px',
  border: '1px solid #ccc',
  outline: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease-in-out',

  '&:checked': {
    borderColor: 'teal200',
    backgroundColor: 'teal200',
  },

  '& + span': {
    marginLeft: '8px',
  },

  '&:checked::after': {
    content: '""',
    display: 'block',
    width: '5px',
    height: '10px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
    marginLeft: '6px',
    marginTop: '2px',
  },
});

const checkboxLabelStyle = css({
  fontSize: '14px',
  lineHeight: '1',
  userSelect: 'none',
});

type CheckboxProps = HTMLProps<HTMLInputElement> & {
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, className, label, checked, onChange }, ref) => (
    <label className={clsx(checkboxContainerStyle, className)}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} ref={ref} className={checkboxInputStyle} />
      {label && <span className={checkboxLabelStyle}>{label}</span>}
    </label>
  ),
);
