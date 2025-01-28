import Button from '../Button';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/clsx';

export interface BottomButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const BottomButtonVariants = cva(
  'fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] text-18 font-semibold',
  {
    variants: {
      disabled: {
        true: 'bg-gray-300',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);
export default function BottomButton({
  disabled,
  onClick,
  children,
  className,
}: BottomButtonProps) {
  return (
    <Button
      size="medium"
      bgColor="primary"
      textColor="white"
      disabled={disabled}
      onClick={onClick}
      className={cn(BottomButtonVariants({ disabled }), className)}
    >
      {children}
    </Button>
  );
}
