import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/clsx';
import { buttonVariants, ButtonVariantsProps } from './variants';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<ButtonVariantsProps, 'disabled'> {}

export default function Button({
  fullWidth,
  height,
  bgColor,
  textColor,
  fontSize,
  fontWeight,
  rounded,
  active,
  disabled,
  borderPosition,
  borderWidth,
  borderStyle,
  borderColor,
  children,
  className,
  ...rest
}: ButtonProps) {
  const buttonStyles = cn(
    buttonVariants({
      fullWidth,
      height,
      bgColor,
      textColor,
      fontSize,
      fontWeight,
      rounded,
      active,
      borderPosition,
      borderWidth,
      borderStyle,
      borderColor,
    }),
    className,
  );

  return (
    <button className={buttonStyles} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
