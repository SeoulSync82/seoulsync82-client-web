import { cn } from '@/utils/tailwindcss';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

export interface TooltipProps
  extends VariantProps<typeof TooltipVariants>,
    HTMLAttributes<HTMLDivElement> {
  message: string;
}

export const TooltipVariants = cva(
  'flex w-full items-center justify-center rounded-2xl font-semibold text-gray-900 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] px-5 relative',
  {
    variants: {
      size: {
        small: 'w-[282px] h-[34px] text-12',
        medium: 'w-[323px] h-[41px] text-sm',
      },
      direction: {
        topLeft: 'rotate-180 left-[50px] top-0 -translate-y-2',
        topMiddle: 'rotate-180 left-[50%] top-0 -translate-x-1/2 -translate-y-2',
        topRight: 'rotate-180 right-[50px] top-0 -translate-y-2',
        bottomLeft: 'left-[50px] bottom-0',
        bottomMiddle: 'left-[50%] bottom-0 -translate-x-1/2',
        bottomRight: 'right-[50px] bottom-0',
      },
      hasTip: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'small',
      direction: 'bottomMiddle',
      hasTip: false,
    },
  },
);

export default function Tooltip({ message, size, direction, hasTip, className }: TooltipProps) {
  const tooltipContainerStyle = cn(TooltipVariants({ size, direction, hasTip }), '', className);

  return (
    <div className={tooltipContainerStyle}>
      {message}
      {/* TODO: implement hasTip */}
    </div>
  );
}
