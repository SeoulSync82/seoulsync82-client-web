import { cva, VariantProps } from 'class-variance-authority';

export const selectSubwayButtonVariants = cva('', {
  variants: {
    active: {
      true: 'text-primary-500 font-bold',
      false: 'text-gray-400 font-medium',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export type SelectSubwayButtonVariantsProps = VariantProps<typeof selectSubwayButtonVariants>;
