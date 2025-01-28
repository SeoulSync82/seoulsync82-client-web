import clsx from 'clsx';
import { ButtonColor } from '../buttons/types';

export type TagPropsType = {
  size: 'small' | 'medium';
  content: string;
  color: ButtonColor;
  className?: string;
  onClick?: () => void;
};

export default function Tag({ size, content, color, className, onClick }: TagPropsType) {
  const sizeVariants = {
    small: 'h-[26px] text-14',
    medium: 'h-[30px] text-18',
  };

  const bgColorVariants = {
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
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-[50px]',
        bgColorVariants[color],
        sizeVariants[size],
        'w-full font-semibold',
        className,
      )}
      onClick={onClick}
    >
      {content}
    </div>
  );
}
