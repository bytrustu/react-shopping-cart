import { clsx } from 'clsx';
import { ElementType, PropsWithChildren } from 'react';
import { css } from '@styled-system/css';

export enum TypographyVariants {
  caption = 'caption',
  body = 'body',
  subtitle = 'subtitle',
  title = 'title',
  headline = 'headline',
  display = 'display',
}

export type TypographyVariant = keyof typeof TypographyVariants;

type TypographyProps = PropsWithChildren<{
  variant?: TypographyVariant;
  as?: ElementType;
  className?: string;
}>;

const typographyVariantStyle = {
  caption: css({
    fontSize: 'caption',
    fontWeight: 'regular',
  }),
  body: css({
    fontSize: 'body',
    fontWeight: 'regular',
  }),
  subtitle: css({
    fontSize: 'subtitle',
    fontWeight: 'regular',
  }),
  title: css({
    fontSize: 'title',
    fontWeight: 'medium',
  }),
  headline: css({
    fontSize: 'headline',
    fontWeight: 'medium',
  }),
  display: css({
    fontSize: 'display',
    fontWeight: 'medium',
  }),
} as const;

export const Typography = ({ children, as: Component = 'span', variant = 'body', className }: TypographyProps) => {
  const fontStyle = typographyVariantStyle[variant];

  return <Component className={clsx(fontStyle, className)}>{children}</Component>;
};

Typography.displayName = 'Typography';
