import { cn } from '@/utils/clsx';
import { ButtonVariants } from './variants';
import { ButtonBorder, ButtonProps } from './types';

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
  borderRadius,
  children,
}: ButtonProps) {
  const className = cn(
    ButtonVariants({
      size,
      bgColor,
      textColor,
      borderStyle:
        borderPosition && borderSize && (`${borderPosition}-${borderSize}` as ButtonBorder),
      borderColor,
      isActive,
      disabled,
    }),
    borderRadius && `rounded-[${borderRadius}px]`,
  );

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
