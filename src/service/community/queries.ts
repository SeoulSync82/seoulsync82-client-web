import CommunityService from './CommunityService';

const queryKeys = {
  getCommunityPostList: ['communityPostList'] as const,
  getCommunityPostDetail: ['communityPostDetail'] as const,
};

export const queryOptions = {
  getCommunityPostList: () => ({
    queryKey: queryKeys.getCommunityPostList,
    queryFn: () => CommunityService.getCommunityPostList(),
  }),
  getCommunityPostDetail: (uuid: string) => ({
    queryKey: queryKeys.getCommunityPostDetail,
    queryFn: () => CommunityService.getCommunityPostDetail(uuid),
  }),
};
