import { cva, VariantProps } from 'class-variance-authority';

export const tabButtonVariants = cva('', {
  variants: {
    active: {
      true: 'border-b-[2px] border-gray-900 font-bold text-gray-900',
      false: 'border-b-[1px] border-gray-200 font-medium text-gray-300',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
});

export type TabButtonVariantsProps = VariantProps<typeof tabButtonVariants>;
