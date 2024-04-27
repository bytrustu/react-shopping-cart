import { Meta, StoryObj } from '@storybook/react';
import { Button, buttonRecipe } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitive/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: buttonRecipe.variantMap.variant,
      control: { type: 'radio' },
    },
    colorScheme: {
      options: buttonRecipe.variantMap.colorScheme,
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'button',
    variant: 'solid',
    colorScheme: 'teal',
    children: 'Button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'solid',
  },
};

export const WithDisabled: Story = {
  args: {
    disabled: true,
  },
};
