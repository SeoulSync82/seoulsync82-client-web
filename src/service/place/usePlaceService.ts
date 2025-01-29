import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const usePlaceCulture = (size: number = 10, last_id: number = 0) => {
  return useQuery(queryOptions.getPlaceCulture(size, last_id));
};

export const usePlaceCultureDetail = (uuid: string) => {
  return useQuery(queryOptions.getPlaceCultureDetail(uuid));
};

export const usePlaceExhibition = (
  size: number = 10,
  last_id: number = 0,
  order: 'latest' | 'deadline',
) => {
  return useQuery(queryOptions.getPlaceExhibition(size, last_id, order));
};

export const usePlacePopup = (
  size: number = 10,
  last_id: number = 0,
  order: 'latest' | 'deadline',
) => {
  return useQuery(queryOptions.getPlacePopup(size, last_id, order));
};

export const usePlaceDetail = (uuid: string) => {
  return useQuery(queryOptions.getPlaceDetail(uuid));
};
