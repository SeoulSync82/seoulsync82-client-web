import Button from '../Button';
import { ButtonColor } from '../types';

export default function SelectSubwayButton({
  textColor,
  onClick,
  isActive,
  content,
}: {
  textColor: ButtonColor;
  onClick: () => void;
  isActive?: boolean;
  content: string;
}) {
  return (
    <Button
      size="small"
      bgColor="gray100"
      textColor={textColor}
      borderPosition="bottom"
      borderSize="thin"
      isActive={isActive}
      onClick={onClick}
      className="border-b border-gray-200"
    >
      {content}
    </Button>
  );
}
