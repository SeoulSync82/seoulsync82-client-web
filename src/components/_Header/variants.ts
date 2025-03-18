import { cva } from 'class-variance-authority';

export const headerVariants = cva('left-0 top-0 flex h-[60px] w-full items-center', {
  variants: {
    isHomePage: {
      true: 'justify-between px-[20px]',
      false: 'px-5 text-center',
    },
  },
  defaultVariants: {
    isHomePage: true,
  },
});
