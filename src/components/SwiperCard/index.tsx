import React from 'react';
import { Link } from 'react-router';
import { cn } from '@/utils/tailwindcss';
import { PlaceItem } from '@/service/place/types';
import { convertDateToYMD } from '@/utils';

const SWIPER_CARD_STYLES = {
  container: 'flex aspect-[3/4] flex-col justify-end',
  background: 'bg-gray-200',
  text: 'text-sm font-medium leading-5',
  skeleton: 'animate-pulse',
  rounded: 'rounded-md',
  minWidth: 'clamp(240px, 64vw, 275px)',
  height: 'h-[366px]',
};

interface SwiperCardProps {
  idx: number;
  item: PlaceItem;
  background: string;
  link: string;
  total: number;
}

const SwiperCard: React.FC<SwiperCardProps> = ({ idx, item, background, link, total }) => {
  return (
    <Link
      style={{
        background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minWidth: SWIPER_CARD_STYLES.minWidth,
        height: SWIPER_CARD_STYLES.height,
      }}
      className={cn(SWIPER_CARD_STYLES.container, SWIPER_CARD_STYLES.rounded)}
      to={link}
    >
      <div className="mb-2 w-full px-4">
        <div className="w-full truncate text-2xl font-bold leading-7 text-white">
          {item?.place_name}
        </div>
      </div>
      <div className="mb-7 flex w-full items-end justify-between px-4 text-white">
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col items-center">
            <div className={SWIPER_CARD_STYLES.text}>{item?.address}</div>
            <div className={SWIPER_CARD_STYLES.text}>
              {convertDateToYMD(item?.start_date)} - {convertDateToYMD(item?.end_date)}
            </div>
          </div>
        </div>
        <div className={SWIPER_CARD_STYLES.text}>
          <span className="font-bold">{idx + 1}</span>/<span>{total}</span>
        </div>
      </div>
    </Link>
  );
};

export default SwiperCard;
