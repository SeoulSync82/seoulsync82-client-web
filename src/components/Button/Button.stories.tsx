import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};
