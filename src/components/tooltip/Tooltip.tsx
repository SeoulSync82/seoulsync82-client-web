import SVGIcon from '../svg-icon/SVGIcon';
import { TooltipProps } from './types';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/clsx';
import clsx from 'clsx';

export const TooltipVariants = cva('relative h-[41px]', {
  variants: {
    size: {
      small: 'w-[282px] h-[34px] text-12',
      medium: 'w-[323px]',
    },
    direction: {
      topLeft: 'rotate-180 left-[50px] top-0 -translate-y-2',
      topMiddle: 'rotate-180 left-[50%] top-0 -translate-x-1/2 -translate-y-2',
      topRight: 'rotate-180 right-[50px] top-0 -translate-y-2',
      bottomLeft: 'left-[50px] bottom-0',
      bottomMiddle: 'left-[50%] bottom-0 -translate-x-1/2',
      bottomRight: 'right-[50px] bottom-0',
    },
    isBubble: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    size: 'medium',
    direction: 'bottomMiddle',
    isBubble: true,
  },
});

export default function Tooltip({
  size = 'medium',
  direction = 'bottomMiddle',
  message,
  isBubble = true,
  className,
}: TooltipProps) {
  const containerClassName = cn(
    TooltipVariants({ size, direction }),
    'flex w-full items-center justify-center rounded-2xl font-semibold text-[#101010] shadow-[2px_2px_8px_rgba(0,0,0,0.1)]',
  );

  return (
    <div className={clsx(TooltipVariants({ size, direction }), className)}>
      <div className={containerClassName}>{message}</div>
      {/* TODO: implement isBubble */}
      {/* {isBubble && (
        <div className={cn('absolute', 'shadow-[2px_2px_8px_rgba(0,0,0,0.1)]')}>
          <SVGIcon name={'DownTriangle'} width={16} height={16} active={false} />
        </div>
      )} */}
    </div>
  );
}
