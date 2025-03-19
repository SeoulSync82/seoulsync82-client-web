import { cva, VariantProps } from 'class-variance-authority';
import { ButtonBorderProps } from './types';

export const buttonVariants = cva('flex items-center justify-center', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    height: {
      24: 'h-[24px]',
      36: 'h-[36px]',
      44: 'h-[44px]',
      48: 'h-[48px]',
      60: 'h-[60px]',
      72: 'h-[72px]',
      76: 'h-[76px]',
    },
    bgColor: {
      primary: 'bg-primary-500',
      'gray-50': 'bg-gray-50',
      'naver-green': 'bg-naver-green',
      'kakao-yellow': 'bg-kakao-yellow',
      'google-gray': 'bg-google-gray',
      'gray-900': 'bg-gray-900',
      'gray-100': 'bg-gray-100',
      'gray-200': 'bg-gray-200',
      'gray-300': 'bg-gray-300',
      'gray-400': 'bg-gray-400',
      white: 'bg-white',
    },
    textColor: {
      primary: 'text-primary-500',
      white: 'text-white',
      black: 'text-black',
      'naver-green': 'text-naver-green',
      'kakao-yellow': 'text-kakao-yellow',
      'google-gray': 'text-google-gray',
      'gray-100': 'text-gray-100',
      'gray-200': 'text-gray-200',
      'gray-300': 'text-gray-300',
      'gray-400': 'text-gray-400',
      'gray-900': 'text-gray-900',
    },
    fontSize: {
      10: 'text-[10px]',
      12: 'text-[12px]',
      14: 'text-[14px]',
      16: 'text-[16px]',
      18: 'text-[18px]',
      20: 'text-[20px]',
      24: 'text-[24px]',
      32: 'text-[32px]',
      40: 'text-[40px]',
      48: 'text-[48px]',
    },
    fontWeight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    rounded: {
      4: 'rounded-[4px]',
      8: 'rounded-[8px]',
      16: 'rounded-[16px]',
      24: 'rounded-[24px]',
      full: 'rounded-full',
      none: '',
    },
    active: {
      true: 'active:opacity-90',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    fullWidth: false,
    height: 48,
    bgColor: 'white',
    textColor: 'gray-900',
    fontSize: 16,
    fontWeight: 'bold',
    rounded: 'none',
    active: false,
    disabled: false,
  },
});

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export const combineBorderStyles = (
  borderWidth: ButtonBorderProps['borderWidth'] = 1,
  borderStyle: ButtonBorderProps['borderStyle'] = 'solid',
  borderColor: ButtonBorderProps['borderColor'],
  borderPosition: ButtonBorderProps['borderPosition'] = '',
) => {
  return borderPosition
    ? `border-${borderStyle} border-${borderPosition.slice(0, 1)}-[${borderWidth}px]`
    : `border-${borderStyle} border-[${borderWidth}px] border-${borderColor}`;
};
