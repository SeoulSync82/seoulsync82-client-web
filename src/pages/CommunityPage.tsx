import React from 'react';
import Image from '@/components/Image';
import SVGIcon from '@/components/SvgIcon';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useCommunityPostList } from '@/service/community/useCommunityService';
import { convertDateToYMD } from '@/utils';
import { Link } from 'react-router';

const ORDER_TYPES = [
  { type: 'popular', label: '인기순' },
  { type: 'latest', label: '최신순' },
];

const CommunityPage: React.FC = () => {
  const { getQueryParam } = useQueryParams();
  const order = (getQueryParam('order') as 'popular' | 'latest') || 'popular';
  const { data } = useCommunityPostList({
    size: 10,
    next_page: '',
    me: false,
    order,
  });

  const items = data?.data?.items || [];

  return (
    <div className="page">
      <div className="flex h-[calc(100dvh-146px)] w-full flex-col justify-between">
        <div className="flex w-full items-center justify-between px-5">
          <div className="flex items-center gap-1 text-14">
            <span className="font-semibold text-gray-300">콘텐츠</span>
            <span className="font-bold text-primary-500">{items.length}</span>
          </div>
          <OrderTypeFilters currentOrder={order} />
        </div>
        <CommunityPostList items={items} />
      </div>
    </div>
  );
};

export default CommunityPage;

interface OrderTypeFiltersProps {
  currentOrder: 'popular' | 'latest';
}

const OrderTypeFilters: React.FC<OrderTypeFiltersProps> = ({ currentOrder }) => (
  <div className="flex items-center text-14">
    {ORDER_TYPES.map(({ type, label }, idx) => (
      <Link
        key={type}
        to={`/community?order=${type}`}
        className={`
          ${idx === 0 ? 'border-r-[1px] border-[#d9d9d9] pr-[10px]' : ''}
          ${idx === 1 ? 'pl-[10px]' : ''}
          ${currentOrder === type ? 'font-bold text-black' : 'font-medium text-gray-300'}
        `}
      >
        {label}
      </Link>
    ))}
  </div>
);

interface CommunityPostListProps {
  items: any[];
}

const CommunityPostList: React.FC<CommunityPostListProps> = ({ items }) => (
  <div className="hide-scroll mt-5 flex w-full flex-wrap gap-x-[10px] gap-y-5 overflow-y-scroll px-5">
    {items.map((item) => (
      <Link
        to={`/course/${item.course_uuid}`}
        key={item.course_uuid}
        className="w-[calc((100%-10px)/2)]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[2px]">
            <Image className="rounded-full" src={item.user_profile_image} width={20} height={20} />
            <span className="text-12 font-bold">{item.user_name}</span>
          </div>
          <div className="flex items-center">
            <SVGIcon name="Heart" width={16} height={16} active />
            <span className="text-14 font-medium text-gray-400">{item.like}</span>
          </div>
        </div>
        <Image src={item.course_image} alt="course image" className="mt-2 rounded-md" />
        <div className="mt-2 truncate text-14 font-bold leading-[20px]">{item.course_name}</div>
        <div className="mt-1 truncate text-12 font-semibold text-primary-500">
          {item.customs
            .split(', ')
            .map((v: string) => `#${v}`)
            .join(' ')}
        </div>
        <div className="mt-2 text-12 font-semibold text-gray-300">
          {convertDateToYMD(item.created_at)}
        </div>
      </Link>
    ))}
  </div>
);
