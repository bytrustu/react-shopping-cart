import { Meta, StoryObj } from '@storybook/react';
import { Product } from './Product';
import { products } from '@/mocks/data/shoppingCartWorld';

const meta: Meta<typeof Product> = {
  title: 'Components/Product',
  component: Product,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    ...products[0],
  },
};

export default meta;

type Story = StoryObj<typeof Product>;

export const Default: Story = {
  args: {
    ...products[0],
  },
};
