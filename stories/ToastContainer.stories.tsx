import React from 'react';
import { Meta } from '@storybook/react';
import ToastContainer from '../src/toast-container';

const toast: Meta = {
  title: 'ToastContainer',
  component: ToastContainer,
  argTypes: {},
};

export default toast;

export const withToastContainer = (args: any) => (
  <ToastContainer {...args}>Hello World this is Shivaraj Bakale</ToastContainer>
);
