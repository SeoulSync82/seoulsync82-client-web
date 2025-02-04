import clsx from 'clsx';
import { ButtonColor } from '../buttons/types';
import { cva } from 'class-variance-authority';

export type TagPropsType = {
  size: 'small' | 'medium';
  content: string;
  color: ButtonColor;
  className?: string;
  onClick?: () => void;
};

export default function Tag({ size, content, color, className, onClick }: TagPropsType) {
  const tagVariants = cva(
    'flex w-fit items-center justify-center rounded-[50px] px-[16px] font-semibold',
    {
      variants: {
        size: {
          small: 'h-[24px] text-14',
          medium: 'h-[30px] text-18',
        },
        color: {
          primary: 'text-primary-500 bg-primary-50',
          naverGreen: 'text-naver',
          kakaoYellow: 'text-kakao',
          googleGray: 'text-google',
          white: 'text-white',
          gray900: 'text-gray-900',
          gray100: 'text-gray-400 bg-gray-100',
          gray200: 'text-gray-200',
          gray300: 'text-gray-300',
          gray400: 'text-gray-400',
        },
      },
      defaultVariants: {
        size: 'medium',
        color: 'primary',
      },
    },
  );

  return (
    <div
      className={clsx(tagVariants({ size, color }), onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      {content}
    </div>
  );
}
