import { Button } from '..';
import { SelectStationButtonProps } from '../types';
import { selectStationButtonVariants } from './variants';

export default function SelectStationButton({
  children,
  active,
  ...rest
}: SelectStationButtonProps) {
  return (
    <Button
      height={48}
      bgColor="white"
      textColor="gray-400"
      fontSize={16}
      fontWeight="normal"
      borderPosition="bottom"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray-200"
      className={selectStationButtonVariants({ active })}
      {...rest}
    >
      {children}
    </Button>
  );
}
