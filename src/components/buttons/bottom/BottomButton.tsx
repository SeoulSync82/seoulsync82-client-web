import Button from '../Button';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/clsx';
import clsx from 'clsx';

export interface BottomButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function BottomButton({
  disabled,
  onClick,
  children,
  className,
}: BottomButtonProps) {
  return (
    <Button
      size="medium"
      bgColor={disabled ? 'gray300' : 'primary'}
      textColor="white"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] text-18 font-semibold',
        className,
      )}
    >
      {children}
    </Button>
  );
}
