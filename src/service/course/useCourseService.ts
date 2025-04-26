import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { PlaceCustomParams, SaveAiRecommendCourseRequest } from './types';
import CourseService from './CourseService';
import SubwayService from '../subway/SubwayService';

const queryKeys = {
  getCourseRecommend: (station_uuid: string, theme_uuid: string) =>
    ['courseRecommend', station_uuid, theme_uuid] as const,
  getPlaceCustomize: (place_uuids: string, place_type: string) =>
    ['placeCustomize', place_uuids, place_type] as const,
  saveCourseRecommend: ['saveCourseRecommend'] as const,
  getCourseDetail: (uuid: string) => ['getCourseDetail', uuid] as const,
};

const queryOptions = {
  getCourseRecommend: (station_uuid: string, theme_uuid: string = '', { enabled }: any) => ({
    queryKey: queryKeys.getCourseRecommend(station_uuid, theme_uuid),
    queryFn: () => CourseService.getCourseRecommend(station_uuid, theme_uuid),
    enabled,
    retryOnWindowFocus: false,
    retryOnMount: false,
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
  getCourseDetail: (uuid: string) => ({
    queryKey: queryKeys.getCourseDetail(uuid),
    queryFn: () => CourseService.getCourseDetail(uuid),
  }),
};

export const useAiCourseRecommend = (
  stationUuid: string,
  themeUuid: string,
  placeType: string,
  { enabled }: any = {},
) => useQuery(queryOptions.getCourseRecommend(stationUuid, themeUuid, { enabled }));

export const useBookmarkedCourseList = (
  { enabled }: { enabled?: boolean } = {},
  size: number = 10,
  last_id: string = '',
) =>
  useQuery({
    queryKey: ['getBookmarkedCourseList', size],
    queryFn: () => CourseService.getBookmarkedCourseList(size, last_id),
    enabled,
  });

export const useCourseRecommendHistory = (
  { enabled }: { enabled?: boolean } = {},
  size: number = 10,
  last_id: string = '',
) =>
  useQuery({
    queryKey: ['getCourseRecommendHistory', size],
    queryFn: () => CourseService.getMyCourseHistory(size, last_id),
    enabled,
  });

export const useAddCustomPlace = (
  params: PlaceCustomParams,
  { enabled }: { enabled: boolean } = { enabled: false },
) => useQuery(queryOptions.getPlaceCustomize(params, { enabled }));

export const useAddCustomPlaceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PlaceCustomParams) => CourseService.getPlaceCustomize(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkCountSubwayStationCustom'] });
    },
  });
};

export const useCourseDetail = (uuid: string) => useQuery(queryOptions.getCourseDetail(uuid));

export const useCourseDetailInfinite = (uuid: string, last_id: string) =>
  useInfiniteQuery({
    queryKey: ['courseDetail', uuid, last_id],
    queryFn: ({ pageParam = 0 }) => CourseService.getCourseDetail(uuid, pageParam),
    getNextPageParam: (lastPage, pages) => (lastPage.next_id ? pages.length + 1 : undefined),
    initialPageParam: 0,
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
