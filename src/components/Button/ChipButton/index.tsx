import Button from '../Button';
import { ButtonProps } from '../types';

interface ChipButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ChipButton = ({ children, onClick }: ChipButtonProps) => {
  return (
    <Button
      textColor="gray-400"
      bgColor="gray-100"
      fontWeight="medium"
      fontSize={12}
      height={24}
      rounded="full"
      className="px-4"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
export default ChipButton;
