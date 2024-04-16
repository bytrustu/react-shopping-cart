import { CiReceipt } from 'react-icons/ci';
import { PiBowlFoodDuotone, PiShoppingCartSimpleLight } from 'react-icons/pi';
import { Meta, StoryObj } from '@storybook/react';
import { EmptyDescription } from './EmptyDescription';

const meta: Meta<typeof EmptyDescription> = {
  title: 'Components/EmptyDescription',
  component: EmptyDescription,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EmptyDescription>;

export const Primary: Story = {
  render: () => <EmptyDescription icon={<div>Icon</div>} description="Description" />,
};

export const WithEmptyProduct: Story = {
  render: () => <EmptyDescription icon={<PiBowlFoodDuotone />} description="상품이 없습니다" />,
};

export const WithEmptyCart: Story = {
  render: () => <EmptyDescription icon={<PiShoppingCartSimpleLight />} description="장바구니가 비었습니다." />,
};

export const WithEmptyOrder: Story = {
  render: () => <EmptyDescription icon={<CiReceipt />} description="주문이 존재하지 않습니다." />,
};
