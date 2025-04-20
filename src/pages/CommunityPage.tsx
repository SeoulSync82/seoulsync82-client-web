import React, { useMemo, useCallback } from 'react';
import Image from '@/components/Image';
import SVGIcon from '@/components/SvgIcon';
import { Link } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';
import { convertDateToYMD } from '@/utils';
import {
  useCommunityPostCancelLike,
  useCommunityPostLike,
  useCommunityPostList,
} from '@/service/community/useCommunityService';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { CommunityPostItem } from '@/service/community/types';

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

  return (
    <div className="page">
      <div className="flex h-[calc(100dvh-146px)] w-full flex-col justify-between">
        <Header itemsCount={items.length} currentOrder={order} />
        <CommunityPostList items={items} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </div>
    </div>
  );
};

const Header: React.FC<{ itemsCount: number; currentOrder: 'popular' | 'latest' }> = ({
  itemsCount,
  currentOrder,
}) => (
  <div className="flex w-full items-center justify-between px-5">
    <ItemCountDisplay count={itemsCount} />
    <OrderTypeFilters currentOrder={currentOrder} />
  </div>
);

const ItemCountDisplay: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center gap-1 text-14">
    <span className="font-semibold text-gray-300">콘텐츠</span>
    <span className="font-bold text-primary-500">{count}</span>
  </div>
);

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
  items: CommunityPostItem[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const CommunityPostList: React.FC<CommunityPostListProps> = ({
  items,
  hasNextPage,
  fetchNextPage,
}) => {
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

interface PostItemProps {
  item: CommunityPostItem;
}

const PostItem: React.FC<PostItemProps> = ({ item }) => {
  const { mutate: like } = useCommunityPostLike();
  const { mutate: cancelLike } = useCommunityPostCancelLike();

  const handleLikePost = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      item.isLiked ? cancelLike(item.uuid) : like(item.uuid);
    },
    [item, like, cancelLike],
  );

  return (
    <Link to={`/course/${item.course_uuid}`} className="w-[calc((100%-10px)/2)]">
      <div className="flex items-center justify-between">
        <UserProfile userImage={item.user_profile_image} userName={item.user_name} />
        <LikeButton isLiked={item.isLiked} likeCount={item.like_count} onClick={handleLikePost} />
      </div>
      <Image
        src={item.course_image}
        width={190}
        height={190}
        fallbackWidth={76}
        fallbackHeight={76}
        fallbackBgColor="gray-50"
        fallbackStatus="bad"
        alt="course image"
        className="mt-2 rounded-md"
      />
      <div className="mt-2 line-clamp-2 text-14 font-bold leading-[20px]">{item.course_name}</div>
      <CustomTags customs={item.customs} />
      <div className="mt-2 text-12 font-semibold text-gray-300">
        {convertDateToYMD(item.created_at)}
      </div>
    </Link>
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
      width={24}
      height={24}
      fallbackWidth={16}
      fallbackHeight={16}
    />
    <span className="text-14 font-bold">{userName}</span>
  </div>
);

const LikeButton: React.FC<{
  isLiked: boolean;
  likeCount: number;
  onClick: (e: React.MouseEvent) => void;
}> = ({ isLiked, likeCount, onClick }) => (
  <div className="flex items-center gap-0.5">
    <SVGIcon name="Heart" width={16} height={16} active={isLiked} onClick={onClick} />
    <span className="text-14 font-medium text-gray-400">{likeCount}</span>
  </div>
);

const CustomTags: React.FC<{ customs: string }> = ({ customs }) => (
  <div className="mt-1 truncate text-12 font-semibold text-primary-500">
    {customs
      .split(', ')
      .map((v) => `#${v}`)
      .join(' ')}
  </div>
);

export default CommunityPage;
