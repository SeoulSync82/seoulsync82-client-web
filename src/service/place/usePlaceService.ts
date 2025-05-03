import { useQuery } from '@tanstack/react-query';
import PlaceService from './PlaceService';

export const usePlaceCulture = (size: number = 10, last_id?: number) => {
  return useQuery({
    queryKey: ['placeCulture', size, last_id],
    queryFn: () => PlaceService.getPlaceCulture(size, last_id),
  });
};

export const usePlaceExhibition = (
  size: number = 10,
  last_id?: number,
  order: 'latest' | 'deadline' = 'latest',
) => {
  return useQuery({
    queryKey: ['placeExhibition', size, last_id, order],
    queryFn: () => PlaceService.getPlaceExhibition(size, last_id, order),
  });
};

export const usePlacePopup = (
  size: number = 10,
  last_id?: number,
  order: 'latest' | 'deadline' = 'latest',
) => {
  return useQuery({
    queryKey: ['placePopup', size, last_id, order],
    queryFn: () => PlaceService.getPlacePopup(size, last_id, order),
  });
};

export const usePlaceDetail = (uuid: string) => {
  return useQuery({
    queryKey: ['placeDetail', uuid],
    queryFn: () => PlaceService.getPlaceDetail(uuid),
  });
};
