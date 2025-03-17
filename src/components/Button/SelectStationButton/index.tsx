import { ButtonProps } from '../Button';
import { Button } from '..';

interface SelectStationButtonProps extends ButtonProps {}

export default function SelectStationButton({ children, ...rest }: SelectStationButtonProps) {
  return (
    <Button
      height={48}
      bgColor="white"
      textColor="gray400"
      borderPosition="bottom"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray200"
      {...rest}
    >
      {children}
    </Button>
  );
}
