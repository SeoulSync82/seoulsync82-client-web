import React, { useMemo, Suspense } from 'react';
import SVGIcon from '@/components/SvgIcon';
import { Link } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';
import { convertDateToYMD } from '@/utils';
import { useCommunityPostList } from '@/service/community/useCommunityService';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { CommunityPostItem } from '@/service/community/types';
import { cn } from '@/utils/tailwindcss';

const Image = React.lazy(() => import('@/components/Image'));

const ORDER_TYPES = [
  { type: 'popular', label: '인기순' },
  { type: 'latest', label: '최신순' },
];

const CommunityPage: React.FC = () => {
  const { getQueryParam } = useQueryParams();
  const order = (getQueryParam('order') as 'popular' | 'latest') || 'popular';

  const { data, fetchNextPage, hasNextPage } = useCommunityPostList({
    size: 10,
    next_page: '',
    me: false,
    order,
  });

  const items = useMemo(() => data?.pages?.flatMap((page) => page.data.items) || [], [data]);
  const totalCount = useMemo(
    () => data?.pages[0].data.total_count || 0,
    [data?.pages[0].data.total_count],
  );

  return (
    <div className="page">
      <div className="flex h-[calc(100dvh-146px)] w-full flex-col justify-between">
        <div className="flex w-full items-center justify-between px-5">
          <ItemCountDisplay count={totalCount} />
          <OrderTypeFilters currentOrder={order} />
        </div>
        <CommunityPostList items={items} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </div>
    </div>
  );
};

const ItemCountDisplay: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center gap-1 text-sm">
    <span className="font-semibold text-gray-300">콘텐츠</span>
    <span className="font-bold text-primary-500">{count}</span>
  </div>
);

const OrderTypeFilters: React.FC<{ currentOrder: 'popular' | 'latest' }> = ({ currentOrder }) => (
  <div className="flex items-center">
    {ORDER_TYPES.map(({ type, label }, idx) => (
      <Link
        key={type}
        to={`/community?order=${type}`}
        className={cn(
          'flex items-center text-sm',
          idx === 0 ? 'border-r-[1px] border-[#d9d9d9] pr-2.5' : '',
          idx === 1 ? 'pl-2.5' : '',
          currentOrder === type ? 'font-bold text-black' : 'font-medium text-gray-300',
        )}
      >
        {label}
      </Link>
    ))}
  </div>
);

const CommunityPostList: React.FC<{
  items: CommunityPostItem[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}> = ({ items, hasNextPage, fetchNextPage }) => {
  const { bottomRef } = useIntersectionObserver(hasNextPage, fetchNextPage);

  return (
    <div className="hide-scroll mt-5 flex w-full flex-wrap gap-x-[10px] gap-y-5 overflow-y-scroll px-5">
      {items.map((item) => (
        <PostItem key={item.course_uuid} item={item} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

const PostItem: React.FC<{ item: CommunityPostItem }> = ({ item }) => {
  return (
    <div className="w-[calc((100%-10px)/2)]">
      <div className="flex items-center justify-between">
        <UserProfile userImage={item.user_profile_image} userName={item.user_name} />
        <LikeIcon isLiked={item.isLiked} likeCount={item.like_count} />
      </div>
      <Link to={`/course/${item.course_uuid}`}>
        <Suspense fallback={<div className="h-full w-full animate-pulse bg-gray-200" />}>
          <Image
            src={item.course_image}
            alt="Course Image"
            fallbackWidth={76}
            fallbackHeight={76}
            fallbackBgColor="gray-50"
            fallbackStatus="bad"
            className="mt-2 aspect-square rounded-md"
            objectFit="cover"
            rounded="md"
          />
        </Suspense>
        <div className="mt-2 line-clamp-2 text-sm font-bold leading-5">{item.course_name}</div>
        <Tags customs={item.customs} />
        <div className="mt-2 text-12 font-semibold text-gray-300">
          {convertDateToYMD(item.created_at)}
        </div>
      </Link>
    </div>
  );
};

const UserProfile: React.FC<{ userImage: string; userName: string }> = ({
  userImage,
  userName,
}) => (
  <div className="flex items-center gap-1">
    <Image
      className="rounded-full"
      src={userImage}
      alt="user image"
      width={20}
      height={20}
      fallbackWidth={12}
      fallbackHeight={12}
    />
    <span className="text-xs font-bold">{userName}</span>
  </div>
);

const LikeIcon: React.FC<{
  isLiked: boolean;
  likeCount: number;
}> = ({ isLiked, likeCount }) => (
  <div className="flex items-center gap-0.5">
    <SVGIcon name="Heart" width={16} height={16} active={isLiked} />
    <span className="text-sm font-medium text-gray-400">{likeCount}</span>
  </div>
);

const Tags: React.FC<{ customs: string }> = ({ customs }) => (
  <div className="mt-1 truncate text-12 font-semibold text-primary-500">
    {customs
      .split(', ')
      .map((v) => `#${v}`)
      .join(' ')}
  </div>
);

export default CommunityPage;
