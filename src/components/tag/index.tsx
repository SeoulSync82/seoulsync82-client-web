import { cn } from '@/utils/clsx';
import { tagVariants, TagVariantsProps } from './variants';

export interface TagProps extends TagVariantsProps {
  content: string;
  className?: string;
  onClick?: () => void;
}

export default function Tag({ content, className, onClick, ...rest }: TagProps) {
  return (
    <div
      className={cn(tagVariants({ ...rest }), onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      {content}
    </div>
  );
}
