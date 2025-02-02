import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const useCourseRecommend = (
  { enabled }: { enabled?: boolean } = {},
  station_uuid: string,
  theme_uuid: string,
) => {
  return useQuery(queryOptions.getCourseRecommend({ enabled }, station_uuid, theme_uuid));
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
