import { cn } from '@/utils/tailwindcss';
import { tabButtonVariants } from './variants';
import { TabButtonProps } from '@/components/Button/types';
import { Button } from '@/components/Button';

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
      textColor="gray-300"
      fontSize={16}
      fontWeight="medium"
      rounded="none"
      borderPosition="bottom"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray-200"
      className={cn(tabButtonStyle, className)}
      {...rest}
    >
      {children}
    </Button>
  );
}
