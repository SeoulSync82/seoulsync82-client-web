import { cva, type VariantProps } from 'class-variance-authority';

export const ButtonVariants = cva('flex items-center justify-center w-full cursor-pointer', {
  variants: {
    size: {
      small: 'min-h-[46px] text-14',
      medium: 'min-h-[56px] text-16',
      large: 'min-h-[76px] text-20',
    },
    bgColor: {
      primary: 'bg-primary-500',
      naverGreen: 'bg-naver',
      kakaoYellow: 'bg-kakao',
      googleGray: 'bg-google',
      white: 'bg-white',
      gray900: 'bg-gray-900',
      gray100: 'bg-gray-100',
      gray200: 'bg-gray-200',
      gray400: 'bg-gray-400',
    },
    textColor: {
      primary: 'text-primary-500',
      naverGreen: 'text-naver',
      kakaoYellow: 'text-kakao',
      googleGray: 'text-google',
      white: 'text-white',
      gray900: 'text-gray-900',
      gray100: 'text-gray-100',
      gray200: 'text-gray-200',
      gray400: 'text-gray-400',
    },
    borderColor: {
      primary: 'border-primary-500',
      naverGreen: 'border-naver',
      kakaoYellow: 'border-kakao',
      googleGray: 'border-google',
      white: 'border-white',
      gray900: 'border-gray-900',
      gray100: 'border-gray-100',
      gray200: 'border-gray-200',
      gray400: 'border-gray-400',
    },
    borderStyle: {
      none: '',
      ['top-thin']: 'border-t-[1px]',
      ['top-medium']: 'border-t-4',
      ['top-bold']: 'border-t-6',
      ['x-thin']: 'border-x-[1px]',
      ['x-medium']: 'border-x-4',
      ['x-bold']: 'border-x-6',
    },
    isActive: {
      true: 'font-bold',
      false: '',
    },
    disabled: {
      true: 'bg-gray-300 text-gray-300 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    size: 'medium',
    bgColor: 'gray100',
    textColor: 'gray900',
    borderStyle: 'none',
    isActive: false,
    disabled: false,
  },
});
