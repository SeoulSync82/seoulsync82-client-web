import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryOptions } from './queries';
import { PlaceCustomParams, SaveAiRecommendCourseRequest } from './types';
import CourseService from './CourseService';
import SubwayService from '../subway/SubwayService';

export const useAiCourseRecommend = (
  stationUuid: string,
  themeUuid: string,
  placeType: string,
  { enabled }: any = {},
) =>
  useQuery({
    queryKey: ['courseRecommend', stationUuid, themeUuid, placeType],
    queryFn: () => CourseService.getCourseRecommend(stationUuid, themeUuid),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

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

export const useAddCustomPlace = (
  { place_uuids, place_type, station_uuid, theme_uuid = '' },
  { enabled }: { enabled: boolean } = {},
) => {
  return useQuery({
    queryKey: ['placeCustomize', place_uuids, place_type],
    queryFn: () =>
      CourseService.getPlaceCustomize({ place_uuids, place_type, station_uuid, theme_uuid }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
  });
};
export const useAddCustomPlaceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ place_uuids, place_type, station_uuid, theme_uuid }: any) =>
      CourseService.getPlaceCustomize({ place_uuids, place_type, station_uuid, theme_uuid }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkCountSubwayStationCustom'] });
    },
  });
};

export const useCourseDetail = (uuid: string) => {
  return useQuery(queryOptions.getCourseDetail(uuid));
};

export const useCheckUsedCustomPlaces = (params: any, { enabled }: { enabled: boolean }) => {
  return useQuery({
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
};

// mutations
export const useSaveRecommendCourse = () => {
  return useMutation({
    mutationFn: (data: SaveAiRecommendCourseRequest) => CourseService.saveCourseRecommend(data),
    onSuccess: ({ data }) => {
      alert('toast: 코스 생성을 완료했어요!');
      window.location.replace(`/course/${data.items}`);
    },
  });
};
