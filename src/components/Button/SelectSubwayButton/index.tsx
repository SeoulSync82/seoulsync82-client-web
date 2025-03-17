import { Button } from '..';
import { SelectSubwayButtonProps } from '../types';

export default function SelectSubwayButton({ children, ...rest }: SelectSubwayButtonProps) {
  return (
    <Button
      height={48}
      bgColor="gray100"
      textColor="gray400"
      borderPosition="bottom"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray200"
      fontWeight="medium"
      {...rest}
    >
      {children}
    </Button>
  );
}
