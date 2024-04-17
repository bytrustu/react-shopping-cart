import { clsx } from 'clsx';
import { HTMLProps, PropsWithChildren } from 'react';
import { cva } from '@styled-system/css';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColorScheme = 'teal' | 'gray';

export type ButtonProps = PropsWithChildren<
  HTMLProps<HTMLButtonElement> & {
    variant?: ButtonVariant;
    colorScheme?: ButtonColorScheme;
    className?: string;
  }
>;

export const Button = ({
  children,
  type = 'button',
  variant = 'solid',
  colorScheme = 'teal',
  className,
  ...props
}: ButtonProps) => {
  const buttonClass = buttonRecipe({ variant, colorScheme });

  return (
    <button type="button" className={clsx(buttonClass, className)} {...props}>
      {children}
    </button>
  );
};

export const buttonRecipe = cva({
  base: {
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    padding: '10px 16px',
    borderRadius: 'md',
    fontSize: 'subtitle',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    _disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  variants: {
    variant: {
      solid: {},
      outline: {},
      ghost: {},
    },
    colorScheme: {
      teal: {},
      gray: {},
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      colorScheme: 'teal',
      css: {
        color: 'white',
        backgroundColor: 'teal200',
      },
    },
    {
      variant: 'solid',
      colorScheme: 'gray',
      css: {
        color: 'white',
        backgroundColor: 'gray300',
      },
    },
    {
      variant: 'outline',
      colorScheme: 'teal',
      css: {
        color: 'teal200',
        outlineWidth: '1px',
        outlineStyle: 'solid',
        outlineColor: 'teal200',
      },
    },
    {
      variant: 'outline',
      colorScheme: 'gray',
      css: {
        color: 'gray400',
        outlineWidth: '1px',
        outlineStyle: 'solid',
        outlineColor: 'gray300',
      },
    },
    {
      variant: 'ghost',
      colorScheme: 'teal',
      css: {
        color: 'teal200',
      },
    },
    {
      variant: 'ghost',
      colorScheme: 'gray',
      css: {
        color: 'gray300',
      },
    },
  ],
});

Button.displayName = 'Button';
