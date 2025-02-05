import CommunityService from './CommunityService';

const queryKeys = {
  getCommunityPostList: (order: 'latest' | 'popular') => ['communityPostList', order] as const,
  getCommunityPostDetail: ['communityPostDetail'] as const,
};

export const queryOptions = {
  getCommunityPostList: (
    size: number = 10,
    next_page: string = '',
    me: boolean = false,
    order: 'latest' | 'popular' = 'popular',
  ) => ({
    queryKey: queryKeys.getCommunityPostList(order),
    queryFn: () => CommunityService.getCommunityPostList(size, next_page, me, order),
  }),
  getCommunityPostDetail: (uuid: string) => ({
    queryKey: queryKeys.getCommunityPostDetail,
    queryFn: () => CommunityService.getCommunityPostDetail(uuid),
  }),
};
