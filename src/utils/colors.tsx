import { IToastTypes } from '../toast';

const COLORS = {
  danger: '#DD766F',
  success: '#4AAE1B',
  white: '#ffffff',
  dark: '#333333',
};

const BG_COLORS: Record<IToastTypes, string> = {
  default: COLORS.dark,
  success: COLORS.success,
  error: COLORS.danger,
};

const TEXT_COLORS: Record<IToastTypes, string> = {
  default: COLORS.white,
  success: COLORS.white,
  error: COLORS.white,
};

export { BG_COLORS, TEXT_COLORS };
