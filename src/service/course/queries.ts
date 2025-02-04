import { useQuery } from '@tanstack/react-query';
import CourseService from './CourseService';
import { PlaceCustomParams } from './types';

const queryKeys = {
  getCourseRecommend: (station_uuid: string, theme_uuid: string) =>
    ['courseRecommend', station_uuid, theme_uuid] as const,
  getPlaceCustomize: (place_uuids: string, place_type: string) =>
    ['placeCustomize', place_uuids, place_type] as const,
  saveCourseRecommend: ['saveCourseRecommend'] as const,
  getMyCourseHistory: ['getMyCourseHistory'] as const,
  getCourseDetail: ['getCourseDetail'] as const,
  getBookmarkedCourseList: ['getBookmarkedCourseList'] as const,
};

export const queryOptions = {
  getCourseRecommend: (station_uuid: string, theme_uuid: string = '', { enabled }: any) => ({
    queryKey: queryKeys.getCourseRecommend(station_uuid, theme_uuid),
    queryFn: () => CourseService.getCourseRecommend(station_uuid, theme_uuid),
    enabled,
  }),
  getPlaceCustomize: (
    { place_uuids, place_type, station_uuid, theme_uuid = '' }: PlaceCustomParams,
    { enabled }: { enabled?: boolean } = {},
  ) => ({
    queryKey: queryKeys.getPlaceCustomize(place_uuids, place_type),
    queryFn: () =>
      CourseService.getPlaceCustomize({ place_uuids, place_type, station_uuid, theme_uuid }),
    enabled,
  }),
  getBookmarkedCourseList: (
    { enabled }: { enabled?: boolean } = {},
    size: number = 10,
    last_id: string = '',
  ) => ({
    queryKey: queryKeys.getBookmarkedCourseList,
    queryFn: () => CourseService.getBookmarkedCourseList(size, last_id),
    enabled,
  }),
  getMyCourseHistory: (
    { enabled }: { enabled?: boolean } = {},
    size: number = 10,
    last_id: string = '',
  ) => ({
    queryKey: queryKeys.getMyCourseHistory,
    queryFn: () => CourseService.getMyCourseHistory(size, last_id),
    enabled,
  }),
  getCourseDetail: (uuid: string) => ({
    queryKey: queryKeys.getCourseDetail,
    queryFn: () => CourseService.getCourseDetail(uuid),
  }),
};
