import CourseService from './CourseService';

const queryKeys = {
  getCourseRecommend: (subway_uuid: string, theme_uuid: string) =>
    ['courseRecommend', subway_uuid, theme_uuid] as const,
  getPlaceCustomize: ['placeCustomize'] as const,
  saveCourseRecommend: ['saveCourseRecommend'] as const,
  getMyCourseHistory: ['getMyCourseHistory'] as const,
  getCourseDetail: ['getCourseDetail'] as const,
};

export const queryOptions = {
  getCourseRecommend: (station_uuid: string, theme_uuid: string = '') => ({
    queryKey: queryKeys.getCourseRecommend(station_uuid, theme_uuid),
    queryFn: () => CourseService.getCourseRecommend(station_uuid, theme_uuid),
  }),
  getPlaceCustomize: (
    place_uuids: string,
    place_type: string,
    subway_uuid: string,
    theme_uuid?: string,
  ) => ({
    queryKey: queryKeys.getPlaceCustomize,
    queryFn: () =>
      CourseService.getPlaceCustomize(place_uuids, place_type, subway_uuid, theme_uuid),
  }),
  saveCourseRecommend: () => ({
    queryKey: queryKeys.saveCourseRecommend,
    queryFn: () => CourseService.saveCourseRecommend(),
  }),
  getMyCourseHistory: (size: number, last_id?: number) => ({
    queryKey: queryKeys.getMyCourseHistory,
    queryFn: () => CourseService.getMyCourseHistory(size, last_id),
  }),
  getCourseDetail: (uuid: string) => ({
    queryKey: queryKeys.getCourseDetail,
    queryFn: () => CourseService.getCourseDetail(uuid),
  }),
};
