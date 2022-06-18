import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import { BG_COLORS, TEXT_COLORS } from '../utils/colors';

const animation = keyframes`
from{
  opacity: 0;
  bottom: -10px;
  transform: translateY(25px);
}
to{
  opacity: auto;
  bottom: 0px;
  transform: translateY(0px);
}
`;

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
  animation: ${animation} 1s cubic-bezier(0.75, -0.24, 0.27, 1.31);
`;

export default ToastItem;
