import { cn } from '@/utils/clsx';

import Button, { ButtonProps } from '../Button';
import { tabButtonVariants, TabButtonVariantsProps } from './variants';

interface TabButtonProps extends Omit<ButtonProps, 'active' | 'disabled'>, TabButtonVariantsProps {}

export default function TabButton({
  active,
  disabled,
  className,
  children,
  ...rest
}: TabButtonProps) {
  const tabButtonStyle = tabButtonVariants({ active, disabled });
  return (
    <Button
      fullWidth
      height={44}
      bgColor="white"
      textColor="gray300"
      fontSize={16}
      fontWeight="medium"
      rounded="none"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray200"
      className={cn(tabButtonStyle, className)}
      {...rest}
    >
      {children}
    </Button>
  );
}
