import { Meta, StoryObj } from '@storybook/react';
import { Typography, TypographyVariants } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Primitive/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: Object.keys(TypographyVariants),
      control: { type: 'radio' },
    },
    as: {
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
      control: { type: 'radio' },
    },
  },
  args: {
    children: 'Next Step',
    variant: 'body',
    as: 'span',
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {};

export const Caption: Story = {
  args: {
    variant: 'caption',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
  },
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
  },
};

export const Title: Story = {
  args: {
    variant: 'title',
  },
};

export const Headline: Story = {
  args: {
    variant: 'headline',
  },
};

export const Display: Story = {
  args: {
    variant: 'display',
  },
};
