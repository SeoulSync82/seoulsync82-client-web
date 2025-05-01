import { ButtonHTMLAttributes } from 'react';
import { buttonVariants } from './variants';
import { TabButtonVariantsProps } from './TabButton/variants';
import { SNSType } from '../SvgIcon/type';
import { selectStationButtonVariants } from './SelectStationButton/variants';
import { VariantProps } from 'class-variance-authority';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'disabled'>,
    ButtonBorderProps {}

export interface ButtonBorderProps {
  borderPosition?: 'top' | 'bottom' | 'left' | 'right' | '';
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  borderColor?:
    | 'primary'
    | 'naver-green'
    | 'kakao-yellow'
    | 'google-gray'
    | 'white'
    | 'gray-900'
    | 'gray-100'
    | 'gray-200'
    | 'gray-300'
    | 'gray-400';
}

export interface TabButtonProps extends ButtonProps, TabButtonVariantsProps {}

export interface SocialLoginButtonProps extends ButtonProps {
  snsName: SNSType;
}

export interface BottomButtonProps extends ButtonProps {}
export interface SelectSubwayButtonProps extends ButtonProps {}
export interface SelectStationButtonProps
  extends ButtonProps,
    VariantProps<typeof selectStationButtonVariants> {}

export interface CapsuleButtonProps extends ButtonProps {
  onClickCancel?: () => void;
}
