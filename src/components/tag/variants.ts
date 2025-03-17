import { cva, type VariantProps } from 'class-variance-authority';

export const tagVariants = cva(
  'flex w-fit items-center justify-center rounded-[50px] px-[16px] font-semibold',
  {
    variants: {
      size: {
        small: 'h-[24px] text-14',
        medium: 'h-[30px] text-18',
      },
      color: {
        primary: 'text-primary-500 bg-primary-50',
        'naver-green': 'text-naver-green',
        'kakao-yellow': 'text-kakao-yellow',
        'google-gray': 'text-google-gray',
        'gray-900': 'text-gray-900',
        'gray-100': 'text-gray-400 bg-gray-100',
        'gray-200': 'text-gray-200',
        'gray-300': 'text-gray-300',
        'gray-400': 'text-gray-400',
        white: 'text-white',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'primary',
    },
  },
);
export type TagVariantsProps = VariantProps<typeof tagVariants>;
