import { ButtonHTMLAttributes } from 'react';
import { ButtonVariantsProps } from './variants';
import { TabButtonVariantsProps } from './TabButton/variants';
import { SNSType } from '../SvgIcon/type';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<ButtonVariantsProps, 'disabled'> {}

export interface TabButtonProps
  extends Omit<ButtonProps, 'active' | 'disabled'>,
    TabButtonVariantsProps {}

export interface SocialLoginButtonProps extends ButtonProps {
  snsName: SNSType;
}

export interface BottomButtonProps extends ButtonProps {}
export interface SelectSubwayButtonProps extends ButtonProps {}
export interface SelectStationButtonProps extends ButtonProps {}
