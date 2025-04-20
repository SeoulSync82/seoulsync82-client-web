import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CommunityService from './CommunityService';

export const useCommunityPostList = ({
  order = 'popular',
  size = 10,
  next_page = '',
  me = false,
}: {
  order: 'latest' | 'popular';
  size: number;
  next_page: string;
  me: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ['communityPostLists', order],
    queryFn: ({ pageParam = next_page }) =>
      CommunityService.getCommunityPostList(size, pageParam.toString(), me, order),
    getNextPageParam: (lastPage) => (lastPage.data.next_page ? lastPage.data.next_page : undefined),
    initialPageParam: next_page,
  });
};

export const useCommunityPostDetail = (uuid: string) => {
  return useQuery({
    queryKey: ['communityPostDetail', uuid],
    queryFn: () => CommunityService.getCommunityPostDetail(uuid),
  });
};

// TODO: Optimistic Update 적용
export const useCommunityPostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => CommunityService.postCommunityLike(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityPostLists'] });
      queryClient.invalidateQueries({ queryKey: ['communityPostDetail'] });
    },
  });
};
export const useCommunityPostCancelLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => CommunityService.postCommunityCancelLike(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityPostLists'] });
      queryClient.invalidateQueries({ queryKey: ['communityPostDetail'] });
    },
  });
};
