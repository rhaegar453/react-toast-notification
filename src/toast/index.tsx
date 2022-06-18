import { HTMLAttributes } from 'react';
import { styled } from 'goober';
import { BG_COLORS, TEXT_COLORS } from '../utils/colors';

export type IToastTypes = 'success' | 'error' | 'default';

interface IToastItem extends HTMLAttributes<HTMLDivElement> {
  type: IToastTypes;
}

const ToastItem = styled.div<IToastItem>`
  padding: 6px 12px;
  border-radius: 5px;
  background-color: ${({ type }) => BG_COLORS[type]};
  color: ${({ type }) => TEXT_COLORS[type]};
`;

export default ToastItem;
