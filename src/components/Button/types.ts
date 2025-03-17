import { ButtonHTMLAttributes } from 'react';
import { ButtonVariantsProps } from './variants';
import { TabButtonVariantsProps } from './TabButton/variants';
import { SNSType } from '../SvgIcon/type';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<ButtonVariantsProps, 'disabled'> {
  borderPosition?: 'top' | 'bottom' | 'left' | 'right';
  borderWidth?: 1 | 2 | 3 | 4;
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

export interface TabButtonProps
  extends Omit<ButtonProps, 'active' | 'disabled'>,
    TabButtonVariantsProps {}

export interface SocialLoginButtonProps extends ButtonProps {
  snsName: SNSType;
}

export interface BottomButtonProps extends ButtonProps {}
export interface SelectSubwayButtonProps extends ButtonProps {}
export interface SelectStationButtonProps extends ButtonProps {}
