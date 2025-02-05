import { queryOptions as communityQueryOptions } from '@/service/community/queries';
import { queryOptions as placeQueryOptions } from '@/service/place/queries';
import { CommunityPostItem } from '@/service/community/types';
import { PlaceItem } from '@/service/place/types';
import { convertDateToYMD } from '@/utils';
import { useQueries } from '@tanstack/react-query';
import { Link, Links } from 'react-router';
import clsx from 'clsx';

function SectionHeader({
  title,
  link,
  linkText,
}: {
  title: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="flex h-[60px] w-full items-center justify-between px-[20px]">
      <h2 className="text-[20px] font-bold text-black">{title}</h2>
      <Link to={link} className="text-[14px] font-bold text-primary-500">
        {linkText}
      </Link>
    </div>
  );
}

function SwiperCard({
  background,
  children,
  minWidth,
  className,
  link,
}: {
  background: string;
  children: React.ReactNode;
  minWidth: string;
  className?: string;
  link: string;
}) {
  return (
    <Link
      style={{
        background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minWidth,
      }}
      className={clsx('flex aspect-[3/4] flex-col justify-end', className)}
      to={link}
    >
      {children}
    </Link>
  );
}

function SectionSwiper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex gap-[12px] overflow-x-auto px-[20px] scrollbar-hide">{children}</div>
    </div>
  );
}

export default function Home() {
  const [{ data: cultureData }, { data: communityPostsData }] = useQueries({
    queries: [placeQueryOptions.getPlaceCulture(), communityQueryOptions.getCommunityPostList()],
  });

  return (
    <div className="page gap-[10px] overflow-y-auto pb-[109px]">
      <div className="w-full">
        <SectionHeader title="주목해야할 전시 · 팝업" link="/culture" linkText="더보기" />
        <SectionSwiper>
          {cultureData?.data?.items?.map((item: PlaceItem, idx: number) => (
            <SwiperCard
              key={idx}
              link={`/culture/${item.place_type === '전시' ? 'exhibition' : 'popup'}/${item?.uuid}`}
              background={`linear-gradient(180deg, rgba(63, 63, 63, 0) 43.43%, #181616 100%), url(${item.thumbnail})`}
              minWidth="clamp(240px, 64vw, 275px)"
              className="rounded-[8px]"
            >
              <div className="mb-[8px] w-full px-[16px]">
                <div className="w-full truncate text-[22px] font-bold leading-[28px] leading-[28px] text-white">
                  {item?.place_name}
                </div>
              </div>
              <div className="mb-[28px] flex w-full items-end justify-between px-[16px] text-white">
                <div className="flex flex-col gap-[8px]">
                  <div className="flex w-full flex-col items-center">
                    <div className="w-full truncate text-[12px] font-medium leading-[18px]">
                      {item?.address}
                    </div>
                    <div className="w-full truncate text-[12px] font-medium leading-[18px]">
                      {convertDateToYMD(item?.start_date)} - {convertDateToYMD(item?.end_date)}
                    </div>
                  </div>
                </div>
                <div className="text-[12px] font-medium leading-[18px]">
                  <span className="font-bold">{idx + 1}</span>/
                  <span>{cultureData?.data?.items.length}</span>
                </div>
              </div>
            </SwiperCard>
          ))}
        </SectionSwiper>
      </div>
      <div className="w-full">
        <SectionHeader title="인기코스 모아보기" link="/community" linkText="더보기" />
        <SectionSwiper>
          {communityPostsData?.data?.items?.map((item: CommunityPostItem, idx: number) => (
            <SwiperCard
              key={idx}
              background={`linear-gradient(180deg, rgba(63, 63, 63, 0) 43.43%, rgba(63, 63, 63, 0) 100%), url(${item?.course_image || 'https://picsum.photos/138/184'})`}
              minWidth="clamp(120px, 32vw, 138px)"
              className="rounded-[4px]"
              link={`/course/${item?.uuid}`}
            >
              <div
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 2,
                  textOverflow: 'ellipsis',
                }}
                className="mb-[8px] flex h-fit w-full px-[8px] text-[12px] font-semibold leading-[18px] text-white"
              >
                {item?.customs
                  .split(',')
                  .slice(0, -1)
                  .map((v: string) => `#${v}`)
                  .join(' ')}
              </div>
            </SwiperCard>
          ))}
        </SectionSwiper>
      </div>
    </div>
  );
}
