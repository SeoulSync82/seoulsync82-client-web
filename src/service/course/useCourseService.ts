import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { PlaceCustomParams, SaveAiRecommendCourseRequest } from './types';
import CourseService from './CourseService';
import SubwayService from '../subway/SubwayService';

// 내 코스, 북마크
export const useBookmarkedCourseList = (
  { enabled }: { enabled?: boolean } = {},
  size: number = 10,
) =>
  useInfiniteQuery({
    queryKey: ['getBookmarkedCourseList', size],
    queryFn: ({ pageParam = 0 }) => CourseService.getBookmarkedCourseList(size, pageParam),
    getNextPageParam: (lastPage) => {
      const next = lastPage?.data?.last_item_id;
      return next ? next : undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.data.items);
    },
    initialPageParam: 0,
    enabled,
  });

export const useCourseRecommendHistory = (
  { enabled }: { enabled?: boolean } = {},
  size: number = 10,
) =>
  useInfiniteQuery({
    queryKey: ['getCourseRecommendHistory', size],
    queryFn: ({ pageParam = 0 }) => CourseService.getMyCourseHistory(size, pageParam),
    getNextPageParam: (lastPage) => {
      console.log(lastPage.data.last_item_id);
      const next = lastPage?.data?.last_item_id;
      return next ? next : undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.data.items);
    },
    initialPageParam: 0,
    enabled,
  });

// AI 코스 추천
export const useAiCourseRecommend = (
  stationUuid: string,
  themeUuid: string,
  placeType: string,
  { enabled }: any = {},
) =>
  useQuery({
    queryKey: ['courseRecommend', stationUuid, themeUuid],
    queryFn: () => CourseService.getCourseRecommend(stationUuid, themeUuid),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

export const useAddCustomPlace = (
  params: PlaceCustomParams,
  { enabled }: { enabled: boolean } = { enabled: false },
) =>
  useQuery({
    queryKey: ['placeCustomize', params.place_uuids, params.place_type],
    queryFn: () =>
      CourseService.getPlaceCustomize({
        place_uuids: params.place_uuids,
        place_type: params.place_type,
        station_uuid: params.station_uuid,
        theme_uuid: params.theme_uuid,
      }),
    enabled,
  });

export const useAddCustomPlaceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PlaceCustomParams) => CourseService.getPlaceCustomize(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkCountSubwayStationCustom'] });
    },
  });
};

export const useCourseDetail = (uuid: string, { enabled }: { enabled: boolean }) =>
  useQuery({
    queryKey: ['courseDetail', uuid],
    queryFn: () => CourseService.getCourseDetail(uuid),
    enabled,
  });

export const useCheckUsedCustomPlaces = (params: any, { enabled }: { enabled: boolean }) =>
  useQuery({
    queryKey: ['checkUsedPlaces', params.place_uuids, params.place_type],
    queryFn: () =>
      SubwayService.checkCountSubwayStationCustom(
        params.line_uuid,
        params.station_uuid,
        params.place_uuids,
      ),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

export const useSaveRecommendCourse = () =>
  useMutation({
    mutationFn: (data: SaveAiRecommendCourseRequest) => CourseService.saveCourseRecommend(data),
    onSuccess: ({ data }) => {
      alert('toast: 코스 생성을 완료했어요!');
      window.location.replace(`/course/${data.items}`);
    },
  });

export const useAddCourseBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => CourseService.addCourseBookmark(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkedCourseList'] });
      queryClient.invalidateQueries({ queryKey: ['courseDetail'] });
      queryClient.invalidateQueries({ queryKey: ['communityPostDetail'] });
    },
  });
};

export const useCancelCourseBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => CourseService.cancelCourseBookmark(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBookmarkedCourseList'] });
      queryClient.invalidateQueries({ queryKey: ['courseDetail'] });
      queryClient.invalidateQueries({ queryKey: ['communityPostDetail'] });
    },
  });
};

export const useCommentList = (uuid: string, size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['commentList', uuid, size],
    queryFn: ({ pageParam = 0 }) => CourseService.getCommentList(uuid, size, pageParam),
    getNextPageParam: (lastPage) => {
      console.log(lastPage.data.last_item_id);
      const next = lastPage?.data?.last_item_id;
      return next ? next : undefined;
    },
    select: (data) => {
      return {
        author: {
          review: data.pages[0].data.community_review,
          user_name: data.pages[0].data.community_user_name,
          user_profile_image: data.pages[0].data.community_user_profile_image,
          user_uuid: data.pages[0].data.community_user_uuid,
        },
        comments: data.pages.flatMap((page) => page.data.comments),
      };
    },
    initialPageParam: 0,
  });
};

export const useAddComment = (uuid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: string) => CourseService.addComment(uuid, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
  });
};

export const useUpdateComment = (uuid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: string) => CourseService.updateComment(uuid, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => CourseService.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
  });
};
