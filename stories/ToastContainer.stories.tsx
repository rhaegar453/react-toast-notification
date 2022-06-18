/* eslint-disable react/button-has-type */
import React from 'react';
import { Meta } from '@storybook/react';
import ToastContainer, { toast as toastService } from '../src/toast-container';

const toast: Meta = {
  title: 'ToastContainer',
  component: ToastContainer,
  argTypes: {},
};

export default toast;

export const withToastContainer = (args: any) => {
  const handleTopToast = () => {
    console.log('clicking top');
    toastService.success({
      title: 'Hello World', duration: 3000, type: 'error', position: 'top',
    });
  };
  const handleBottomToast = () => {
    console.log('clicking bottom');
    toastService.success({
      title: 'Hello World', duration: 3000, type: 'error', position: 'bottom',
    });
  };
  return (
    <div>
      <ToastContainer {...args} />
      <button onClick={handleTopToast}>Top Toast</button>
      <button onClick={handleBottomToast}>Bottom Toast</button>
    </div>
  );
};
