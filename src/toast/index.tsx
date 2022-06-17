import { value, styled } from 'goober';

const ToastBase = styled.div`
  padding: 6px 12px;
  background-color: ${({ type }) => type};
`;

export default ToastBase;
