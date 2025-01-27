import { cn } from '@/utils/clsx';
import { ButtonVariants } from './variants';
import { ButtonBorder, ButtonProps } from './types';
import clsx from 'clsx';

export default function Button({
  size = 'medium',
  bgColor,
  textColor,
  borderPosition,
  borderSize,
  borderColor,
  isActive = false,
  onClick,
  disabled = false,
  rounded,
  children,
  className,
}: ButtonProps) {
  const buttonStyles = clsx(
    ButtonVariants({
      size,
      bgColor,
      textColor,
      borderStyle:
        borderPosition && borderSize && (`${borderPosition}-${borderSize}` as ButtonBorder),
      borderColor,
      rounded,
      isActive,
      disabled,
    }),
    className,
  );

  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
