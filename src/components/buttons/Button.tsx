import { ButtonVariants } from './variants';
import { ButtonBorder, ButtonProps } from './types';
import clsx from 'clsx';
import { Link } from 'react-router';

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
  href,
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

  const ButtonComponent = href ? Link : 'button';
  const handleClick = href ? undefined : onClick;
  const to = href || undefined;

  return (
    <ButtonComponent to={to as string} className={buttonStyles} onClick={handleClick} disabled={disabled}>
      {children}
    </ButtonComponent>
  );
}
