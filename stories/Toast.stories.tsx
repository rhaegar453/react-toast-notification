import React from 'react';
import { Meta } from '@storybook/react';
import { setup } from 'goober';
import ToastItem from '../src/toast';

setup(React.createElement);

const toast: Meta = {
  title: 'Toast/ToastItem',
  component: ToastItem,
  argTypes: {},
};

export default toast;
export const withToastItem = (args: any) => <ToastItem {...args} />;
