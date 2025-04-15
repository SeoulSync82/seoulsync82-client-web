import { cva } from 'class-variance-authority';

export const listItemVariants = cva(
  'group flex grow cursor-pointer flex-col items-center justify-center',
  {
    variants: {
      active: {
        true: 'active',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const textVariants = cva('text-12 font-bold w-fit', {
  variants: {
    isAiRecommend: {
      true: 'mb-8 text-[#9070CF]',
      false: 'mt-[6px] text-gray-300 group-[&.active]:text-[#353D4A]',
    },
  },
  defaultVariants: {
    isAiRecommend: false,
  },
});

export const iconWrapperVariants = cva('w-fit', {
  variants: {
    isAiRecommend: {
      true: 'mb-[6px]',
      false: '',
    },
  },
  defaultVariants: {
    isAiRecommend: false,
  },
});
