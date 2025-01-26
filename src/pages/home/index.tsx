import { queryOptions as communityQueryOptions } from '@/service/community/queries';
import { queryOptions as placeQueryOptions } from '@/service/place/queries';
import { CommunityPostItem } from '@/service/community/types';
import { PlaceItem } from '@/service/place/types';
import { convertDateToYMD } from '@/utils';
import { useQueries } from '@tanstack/react-query';
import { Link } from 'react-router';

export default function Home() {
  const [{ data: cultureData }, { data: communityPostsData }] = useQueries({
    queries: [placeQueryOptions.getPlaceCulture(), communityQueryOptions.getCommunityPostList()],
  });

  return (
    <div className="page gap-[10px]">
      <div className="w-full">
        <div className="flex h-[60px] w-full items-center justify-between px-[20px]">
          <h2 className="text-[20px] font-bold text-black">주목해야할 전시 · 팝업</h2>
          <Link to="/popups" className="text-[14px] font-bold text-primary-500">
            더보기
          </Link>
        </div>
        <div className="w-full overflow-x-hidden">
          <div className="scrollbar-hide flex w-full gap-[20px] overflow-x-auto px-[20px]">
            {cultureData?.data?.items?.map((item: PlaceItem, idx: number) => (
              <div
                style={{
                  background: `linear-gradient(180deg, rgba(63, 63, 63, 0) 43.43%, rgba(63, 63, 63, 0) 100%), url(${item.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                className="flex h-[320px] min-w-[242px] flex-col gap-[20px] rounded-[8px] bg-cover bg-center"
                key={idx}
              >
                <div className="w-full">{item?.place_name}</div>
                <div className="w-full">
                  <div>{item?.address}</div>
                  <div>
                    {convertDateToYMD(item?.start_date)} - {convertDateToYMD(item?.end_date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex h-[60px] w-full items-center justify-between px-[20px]">
          <h2 className="text-[20px] font-bold text-black">인기코스 모아보기</h2>
          <Link to="/community" className="text-[14px] font-bold text-primary-500">
            더보기
          </Link>
        </div>
        <div className="w-full overflow-x-hidden">
          <div className="scrollbar-hide flex w-full gap-[8px] overflow-x-auto px-[20px]">
            {communityPostsData?.data?.items?.map((item: CommunityPostItem, idx: number) => (
              <div
                style={{
                  background: `linear-gradient(180deg, rgba(63, 63, 63, 0) 43.43%, rgba(63, 63, 63, 0) 100%), url(${item?.course_image || 'https://dummyimage.com/120x156'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                className="flex h-[156px] min-w-[120px] items-end justify-center rounded-[4px] bg-cover bg-center p-[8px]"
                key={idx}
              >
                <div className="w-full text-[12px] font-semibold leading-[18px] text-white">
                  {item?.course_name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
