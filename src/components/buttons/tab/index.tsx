import clsx from 'clsx';
import Button from '../Button';

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
  const tabButtonClassName = clsx(
    'flex h-[44px] w-full items-center justify-center text-16',
    {
      'border-b-[2px] border-gray-900 font-bold text-gray-900': active,
      'border-b-[1px] border-gray-200 font-medium text-gray-300': !active,
      'cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <Button
      size="small"
      bgColor="white"
      textColor="gray300"
      className={tabButtonClassName}
      onClick={onClick}
      href={href}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
