import React from 'react';
import { Meta } from '@storybook/react';
import ToastItem from '../src/toast';

const toast: Meta = {
  title: 'Toast/ToastItem',
  component: ToastItem,
  argTypes: {
    type: {
      options: ['success', 'error', 'default'],
      type: 'select',
    },
  },
};

export default toast;
export const withToastItem = (args: any) => (
  <ToastItem {...args}>Hello World this is the toast item</ToastItem>
);
