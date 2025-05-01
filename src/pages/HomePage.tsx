import { Suspense } from 'react';
import { PlaceItem } from '@/service/place/types';
import { usePlaceCulture } from '@/service/place/usePlaceService';
import Section from '@/components/Section/Section';
import SwiperCardSkeleton from '@/components/SwiperCard/SwiperCardSkeleton';
import SwiperCard from '@/components/SwiperCard';

export default function HomePage() {
  return (
    <div className="page gap-2.5 overflow-y-auto pb-[109px]">
      <Section title="주목해야할 전시 · 팝업" link="/culture">
        <Suspense fallback={<SwiperSectionSkeleton />}>
          <SwiperSection />
        </Suspense>
      </Section>
      <Section title="인기코스 모아보기" link="/community?order=popular">
        <>{/* TODO: 콘텐츠 추가 */}</>
      </Section>
    </div>
  );
}

const SwiperSection = () => {
  const { data: cultureData } = usePlaceCulture(10, 0);
  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex h-1/2 gap-3 overflow-x-auto px-5 scrollbar-hide">
        {cultureData?.data?.items?.map((item: PlaceItem, idx: number) => (
          <SwiperCard
            key={item.uuid}
            idx={idx}
            item={item}
            total={cultureData.data.items.length}
            link={`/culture/${item.place_type === '전시' ? 'exhibition' : 'popup'}/${item?.uuid}`}
            background={`linear-gradient(180deg, rgba(63, 63, 63, 0) 43.43%, #181616 100%), url(${item.thumbnail})`}
          />
        ))}
      </div>
    </div>
  );
};

const SwiperSectionSkeleton = () => (
  <div className="w-full overflow-x-hidden">
    <div className="flex gap-3 overflow-x-auto px-5 scrollbar-hide">
      {Array.from({ length: 5 }).map((_, idx) => (
        <SwiperCardSkeleton key={idx} />
      ))}
    </div>
  </div>
);
