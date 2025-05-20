import { cn } from '@/utils/tailwindcss';
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
      disabled,
    }),
    borderColor && combineBorderStyles(borderWidth, borderStyle, borderColor, borderPosition),
    className,
  );

  return (
    <button className={buttonStyles} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
export default Button;
