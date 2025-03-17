import { Button } from '..';
import { SelectSubwayButtonProps } from '../types';
import { selectSubwayButtonVariants } from './variants';

export default function SelectSubwayButton({ children, active, ...rest }: SelectSubwayButtonProps) {
  return (
    <Button
      height={48}
      bgColor="gray-100"
      textColor="gray-400"
      fontSize={14}
      borderPosition="bottom"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray-200"
      className={selectSubwayButtonVariants({ active })}
      {...rest}
    >
      {children}
    </Button>
  );
}
