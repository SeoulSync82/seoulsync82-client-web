import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const useCommunityPostList = ({
  order = 'popular',
  size = 10,
  next_page,
  me = false,
}: {
  order: 'latest' | 'popular';
  size: number;
  next_page: string;
  me: boolean;
}) => {
  return useQuery(queryOptions.getCommunityPostList(size, next_page, me, order));
};

export const useCommunityPostDetail = (uuid: string) => {
  return useQuery(queryOptions.getCommunityPostDetail(uuid));
};
