import clsx from 'clsx';
import Button from '../Button';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/clsx';

export interface TabButtonProps {
  active?: boolean;
  title?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export default function TabButton({
  active,
  title,
  onClick,
  href,
  className,
  disabled,
}: TabButtonProps) {
  const tabButtonVariants = cva('flex h-[44px] w-full items-center justify-center text-16', {
    variants: {
      active: {
        true: 'border-b-[2px] border-gray-900 font-bold text-gray-900',
        false: 'border-b-[1px] border-gray-200 font-medium text-gray-300',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  });

  return (
    <Button
      size="small"
      bgColor="white"
      textColor="gray300"
      className={cn(tabButtonVariants({ active, disabled }), className)}
      onClick={onClick}
      href={href}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
