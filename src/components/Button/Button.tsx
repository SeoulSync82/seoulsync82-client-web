import { cn } from '@/utils/clsx';
import { buttonVariants, combineBorderStyles } from './variants';
import { ButtonProps } from './types';

const Button = ({
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
}: ButtonProps) => {
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
    }),
    borderPosition && borderWidth && borderStyle && borderColor
      ? combineBorderStyles(borderPosition, borderWidth, borderStyle, borderColor)
      : '',
    className,
  );

  return (
    <button className={buttonStyles} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
export default Button;
