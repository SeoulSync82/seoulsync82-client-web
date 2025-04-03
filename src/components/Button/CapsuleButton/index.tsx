import SvgIcon from '@/components/SvgIcon';
import Button from '../Button';
import { CapsuleButtonProps } from '../types';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/tailwindcss';

const capsuleButtonVariants = cva('px-3', {
  variants: {
    active: {
      true: 'text-primary-600 bg-primary-50 border-primary-500 font-bold',
      false: 'text-gray-900 bg-white border-gray-200 font-medium',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export default function CapsuleButton({
  children,
  active,
  className,
  onClick,
  onClickCancel,
}: CapsuleButtonProps) {
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickCancel?.();
  };

  return (
    <Button
      height={36}
      fontSize={14}
      rounded="full"
      fontWeight="medium"
      textColor="gray-900"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray-200"
      bgColor="white"
      onClick={onClick}
      className={cn(capsuleButtonVariants({ active }), className)}
    >
      <span>{children}</span>
      {active && (
        <SvgIcon
          name="Cancel"
          width={16}
          height={16}
          active={false}
          onClick={handleCancel}
          color="#805BC8"
          className="mb-[2px] ml-1"
        />
      )}
    </Button>
  );
}
