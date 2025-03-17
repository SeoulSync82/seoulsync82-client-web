import { cva, VariantProps } from 'class-variance-authority';

export const selectStationButtonVariants = cva('', {
  variants: {
    active: {
      true: 'bg-primary-500 text-white',
      false: 'bg-white text-gray-400',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export type SelectStationButtonVariantsProps = VariantProps<typeof selectStationButtonVariants>;
