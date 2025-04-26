import { cn } from '@/utils/tailwindcss';

const SWIPER_CARD_STYLES = {
  container: 'flex aspect-[3/4] flex-col justify-end',
  background: 'bg-gray-200',
  skeleton: 'animate-pulse',
  rounded: 'rounded-md',
  minWidth: 'clamp(240px, 64vw, 275px)',
  height: 'h-[366px]',
};

const SwiperCardSkeleton = () => (
  <div
    style={{ minWidth: SWIPER_CARD_STYLES.minWidth, height: SWIPER_CARD_STYLES.height }}
    className={cn(
      SWIPER_CARD_STYLES.container,
      SWIPER_CARD_STYLES.skeleton,
      SWIPER_CARD_STYLES.background,
      SWIPER_CARD_STYLES.rounded,
    )}
  >
    <div className="mb-3 w-full px-4">
      <div className="h-7 w-full rounded-md bg-gray-300"></div>
    </div>
    <div className="mb-7 flex w-full items-end justify-between px-4">
      <div className="h-6 w-2/3 rounded-md bg-gray-300"></div>
    </div>
  </div>
);

export default SwiperCardSkeleton;
