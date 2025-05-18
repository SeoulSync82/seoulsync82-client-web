import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CommunityService from './CommunityService';
import { convertDateToYMD } from '@/utils';

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
  const queryKey = ['communityPostLists', order];
  const queryFn = ({ pageParam = next_page }) =>
    CommunityService.getCommunityPostList(size, pageParam.toString(), me, order);
  const getNextPageParam = (lastPage: any) => lastPage.data.next_page || undefined;
  const select = (data: any) => ({
    pages: data.pages.map((page: any) => ({
      ...page,
      data: {
        ...page.data,
        items: page.data.items.map((item: any) => ({
          ...item,
          created_at: convertDateToYMD(item.created_at),
        })),
      },
    })),
  });

  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam: next_page,
    select,
  });
};

export const useCommunityPostDetail = (uuid: string, { enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['communityPostDetail', uuid],
    queryFn: () => CommunityService.getCommunityPostDetail(uuid),
    enabled,
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

export const useCreateCommunityPost = () => {
  return useMutation({
    mutationFn: ({ uuid, score, review }: { uuid: string; score: number; review: string }) =>
      CommunityService.createCommunityPost(uuid, score, review),
  });
};
