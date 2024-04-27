import { Meta, StoryObj } from '@storybook/react';
import { QuantityCounter } from './QuantityCounter';
import { useQuantityCounter } from '@/components';

const meta: Meta<typeof QuantityCounter> = {
  title: 'Primitive/QuantityCounter',
  component: QuantityCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuantityCounter>;

export const Primary: Story = {
  render: () => {
    const { reset, ...quantityCounter } = useQuantityCounter({ initialQuantity: 10 });
    return <QuantityCounter {...quantityCounter} />;
  },
};
