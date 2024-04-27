import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Product>;

export const Default: Story = {
  args: {
    ...products[0],
  },
};
