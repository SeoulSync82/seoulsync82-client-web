import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const useCommunityPostList = () => {
  return useQuery(queryOptions.getCommunityPostList());
};

export const useCommunityPostDetail = (uuid: string) => {
  return useQuery(queryOptions.getCommunityPostDetail(uuid));
};