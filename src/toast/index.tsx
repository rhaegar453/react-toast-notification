import React from 'react';
import styled from '@emotion/styled';
import { BG_COLORS, TEXT_COLORS } from '../utils/colors';

type IToastType = 'error' | 'success' | 'default';

interface IToastItem {
  type: IToastType;
}

const ToastItem = styled.div<IToastItem>`
  padding: 12px 20px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background-color: ${({ type = 'default' }) => BG_COLORS[type]};
  color: ${({ type = 'default' }) => TEXT_COLORS[type]};
  text-align: center;
  display: inline-block;
`;

export default ToastItem;
