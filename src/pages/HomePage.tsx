import React, { Suspense } from 'react';
import { cn } from '@/utils/tailwindcss';
import { PlaceItem } from '@/service/place/types';
import { convertDateToYMD } from '@/utils';
import { Link } from 'react-router';
import { usePlaceCulture } from '@/service/place/usePlaceService';

export default function HomePage() {
  return (
    <div className="page gap-[10px] overflow-y-auto pb-[109px]">
      <Section title="주목해야할 전시 · 팝업" link="/culture">
        <Suspense fallback={<SectionSwiperSkeleton />}>
          <SectionSwiper />
        </Suspense>
      </Section>
      <Section title="인기코스 모아보기" link="/community?order=popular">
        <>{/* TODO: 콘텐츠 추가 */}</>
      </Section>
    </div>
  );
}

const Section = ({
  title,
  link,
  children,
}: {
  title: string;
  link: string;
  children: React.ReactNode;
}) => (
  <div className="w-full">
    <SectionHeader title={title} link={link} />
    {children}
  </div>
);

const SectionHeader = ({ title, link }: { title: string; link: string }) => (
  <div className="flex h-[60px] w-full items-center justify-between px-[20px]">
    <h2 className="text-[20px] font-bold text-black">{title}</h2>
    <Link to={link} className="text-[14px] font-bold text-primary-500">
      더보기
    </Link>
  </div>
);

const SectionSwiper = () => {
  const { data: cultureData } = usePlaceCulture(10, 0);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex gap-3 overflow-x-auto px-[20px] scrollbar-hide">
        {cultureData?.data?.items?.map((item, idx) => (
          <SwiperCard
            key={item.uuid}
            idx={idx}
            item={item}
            total={cultureData.data.items.length}
            link={`/culture/${item.place_type === '전시' ? 'exhibition' : 'popup'}/${item?.uuid}`}
            background={`linear-gradient(180deg, rgba(63, 63, 63, 0) 43.43%, #181616 100%), url(${item.thumbnail})`}
            minWidth="clamp(240px, 64vw, 275px)"
            className="rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

const SWIPER_CARD_SIZE = {
  HEIGHT: 366,
  MIN_WIDTH: 'clamp(240px, 64vw, 275px)',
  RADIUS: 'rounded-md',
};

const SwiperCard = ({
  idx,
  item,
  background,
  minWidth,
  className,
  link,
  total,
}: {
  idx: number;
  item: PlaceItem;
  background: string;
  minWidth: string;
  className?: string;
  link: string;
  total: number;
}) => {
  return (
    <Link
      style={{
        background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minWidth: SWIPER_CARD_SIZE.MIN_WIDTH,
        height: SWIPER_CARD_SIZE.HEIGHT,
      }}
      className={cn(`flex aspect-[3/4] flex-col justify-end ${SWIPER_CARD_SIZE.RADIUS}`, className)}
      to={link}
    >
      <div className="mb-2 w-full px-4">
        <div className="w-full truncate text-xl font-bold leading-7 text-white">
          {item?.place_name}
        </div>
      </div>
      <div className="mb-7 flex w-full items-end justify-between px-4 text-white">
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col items-center">
            <div className="w-full truncate text-12 font-medium leading-[18px]">
              {item?.address}
            </div>
            <div className="w-full truncate text-12 font-medium leading-[18px]">
              {convertDateToYMD(item?.start_date)} - {convertDateToYMD(item?.end_date)}
            </div>
          </div>
        </div>
        <div className="text-12 font-medium leading-[18px]">
          <span className="font-bold">{idx + 1}</span>/<span>{total}</span>
        </div>
      </div>
    </Link>
  );
};

// Skeletons
const SectionSwiperSkeleton = () => (
  <div className="w-full overflow-x-hidden">
    <div className="flex gap-[12px] overflow-x-auto px-[20px] scrollbar-hide">
      {Array.from({ length: 5 }).map((_, idx) => (
        <SwiperCardSkeleton key={idx} />
      ))}
    </div>
  </div>
);
const SwiperCardSkeleton = () => (
  <div
    style={{ minWidth: SWIPER_CARD_SIZE.MIN_WIDTH, height: SWIPER_CARD_SIZE.HEIGHT }}
    className={cn(
      `flex aspect-[3/4] animate-pulse flex-col justify-end bg-gray-200 ${SWIPER_CARD_SIZE.RADIUS}`,
    )}
  >
    <div className="mb-3 w-full px-4">
      <div className="h-6 w-full rounded bg-gray-300"></div>
    </div>
    <div className="mb-7 flex w-2/3 items-end justify-between px-4">
      <div className="flex w-full flex-col items-center">
        <div className="h-5 w-full rounded bg-gray-300"></div>
      </div>
    </div>
  </div>
);
