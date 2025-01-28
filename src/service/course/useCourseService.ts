import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const useCourseRecommend = (station_uuid: string, theme_uuid: string) => {
  return useQuery(queryOptions.getCourseRecommend(station_uuid, theme_uuid));
};
