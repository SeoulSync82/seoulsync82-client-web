import Button from '../Button';
import { ButtonColor } from '../types';

export default function SelectStationButton({
  bgColor,
  textColor,
  onClick,
  isActive,
  content,
  className,
}: {
  bgColor: ButtonColor;
  textColor: ButtonColor;
  onClick: () => void;
  isActive?: boolean;
  content: string;
  className?: string;
}) {
  return (
    <Button
      size="small"
      bgColor={bgColor}
      textColor={textColor}
      isActive={isActive}
      borderPosition="bottom"
      borderSize="thin"
      onClick={onClick}
      className={className}
    >
      {content}
    </Button>
  );
}
