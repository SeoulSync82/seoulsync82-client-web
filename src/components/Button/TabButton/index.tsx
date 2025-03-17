import { cn } from '@/utils/clsx';
import { TabButtonProps } from '../types';
import { Button } from '..';
import { tabButtonVariants } from './variants';

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
