import { cn } from '@/utils/clsx';
import { Button } from '..';
import { BottomButtonProps } from '../types';

export default function BottomButton({
  disabled,
  className,
  children,
  ...rest
}: BottomButtonProps) {
  return (
    <Button
      height={60}
      bgColor={disabled ? 'gray-300' : 'primary'}
      textColor="white"
      fontSize={18}
      fontWeight="semibold"
      disabled={disabled}
      className={cn('fixed bottom-0 left-0 right-0 mx-auto max-w-[430px]', className)}
      {...rest}
    >
      {children}
    </Button>
  );
}
