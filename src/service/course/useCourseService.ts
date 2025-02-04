import { useMutation, useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';
import { PlaceCustomParams, SaveCourseRecommendReqData } from './types';
import CourseService from './CourseService';

export const useCourseRecommend = (
  station_uuid: string,
  theme_uuid: string,
  { enabled }: any = {},
) => {
  return useQuery(queryOptions.getCourseRecommend(station_uuid, theme_uuid, { enabled }));
};

export const useCourseRecommendHistory = (
  { enabled }: { enabled?: boolean } = {},
  size: number = 10,
  last_id: string = '',
) => {
  return useQuery(queryOptions.getMyCourseHistory({ enabled }, size, last_id));
};

export const useBookmarkedCourseList = (
  { enabled }: { enabled?: boolean } = {},
  size: number = 10,
  last_id: string = '',
) => {
  return useQuery(queryOptions.getBookmarkedCourseList({ enabled }, size, last_id));
};

export const usePlaceCustomize = (
  { place_uuids, place_type, station_uuid, theme_uuid = '' }: PlaceCustomParams,
  { enabled }: { enabled?: boolean } = {},
) => {
  return useQuery(
    queryOptions.getPlaceCustomize(
      { place_uuids, place_type, station_uuid, theme_uuid },
      { enabled },
    ),
  );
};

export const useCourseDetail = (uuid: string) => {
  return useQuery(queryOptions.getCourseDetail(uuid));
};

// mutations
export const useSaveRecommendCourse = () => {
  return useMutation({
    mutationFn: (data: SaveCourseRecommendReqData) => CourseService.saveCourseRecommend(data),
    onSuccess: ({ data }) => {
      alert('toast: 코스 생성을 완료했어요!');
      window.location.replace(`/my-course/${data.items}`);
    },
  });
};
