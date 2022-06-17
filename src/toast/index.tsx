import { HTMLAttributes } from 'react';
import { styled } from 'goober';

export type IToastTypes = 'success' | 'error' | 'default';

interface IToastItem extends HTMLAttributes<HTMLDivElement> {
  type: IToastTypes;
}

const ToastItem = styled.div<IToastItem>`
  padding: 6px 12px;
  border-radius: 5px;
  background-color: ${({ type }) => type};
  color: ${({ type }) => 'white'};
`;

export default ToastItem;
