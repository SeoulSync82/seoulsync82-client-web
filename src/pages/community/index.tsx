import SVGIcon from '@/components/svg-icon/SVGIcon';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useCommunityPostList } from '@/service/community/useCommunityService';
import { convertDateToYMD } from '@/utils';
import { Link } from 'react-router';
import { getDummyImage } from '../home';
import withAuthGuard from '@/hoc/withAuthGuard';

const orderTypes = [
  {
    type: 'popular',
    label: '인기순',
  },
  {
    type: 'latest',
    label: '최신순',
  },
];

function CommunityPage() {
  const { getQueryParam } = useQueryParams();
  const order = getQueryParam('order') ?? 'popular';
  const { data } = useCommunityPostList({ size: 10, next_page: '', me: false, order });

  return (
    <div className="page w-full">
      <div className="flex h-[calc(100dvh-146px)] w-full flex-col justify-between overflow-y-scroll px-[20px]">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center gap-[2px] text-14">
            <span className="font-semibold text-gray-300">콘텐츠</span>
            <span className="font-bold text-primary-500">{data?.data?.items.length}</span>
          </div>
          <div className="flex items-center text-14">
            {orderTypes.map((item: { type: string; label: string }, idx: number) => (
              <Link
                key={item.type}
                to={`/community?order=${item.type}`}
                className={`${idx === 0 ? 'border-r-[1px] border-[#d9d9d9] pr-[10px]' : ''} ${idx === 1 ? 'pl-[10px]' : ''} ${order === item.type ? 'font-bold text-black' : 'font-medium text-gray-300'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-x-[10px] gap-y-[20px]">
          {data?.data?.items.map((item: any) => (
            <Link
              to={`/course/${item.course_uuid}`}
              key={item.course_uuid}
              className="w-[calc((100%-10px)/2)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[2px]">
                  <div className="h-[20px] w-[20px] overflow-hidden rounded-[100px]">
                    <img
                      className="object-cover"
                      src={item.user_profile_image ?? 'https://dummyimage.com/24x24'}
                    />
                  </div>
                  <span className="text-12 font-bold">{item.user_name}</span>
                </div>
                <div className="flex items-center">
                  <SVGIcon name={'Heart'} width={16} height={16} active />
                  <span className="text-14 font-medium text-gray-400">{item.like}</span>
                </div>
              </div>
              <img
                src={item.course_image || getDummyImage()}
                alt="course image"
                className="mt-[10px] aspect-[4/5] min-h-[220px] w-full min-w-[164px] rounded-[4px] object-cover"
              />
              <div className="mt-[10px] truncate text-14 font-bold leading-[20px]">
                {item.course_name}
              </div>
              <div className="mt-[4px] truncate text-12 font-semibold text-primary-500">
                {item.customs
                  .split(', ')
                  .map((v: string) => '#' + v)
                  .join(' ')}
              </div>
              <div className="mt-[4px] text-12 font-semibold text-gray-300">
                {convertDateToYMD(item.created_at)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAuthGuard(CommunityPage);
