import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import PlaceService from './PlaceService';

export const usePlaceCulture = (size: number = 10, last_id?: number) => {
  return useQuery({
    queryKey: ['placeCulture', size, last_id],
    queryFn: () => PlaceService.getPlaceCulture(size, last_id),
  });
};

export const usePlaceExhibition = (order: 'latest' | 'deadline' = 'latest', size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['placeExhibition', size, order],
    queryFn: ({ pageParam = 0 }) => PlaceService.getPlaceExhibition(size, pageParam, order),
    getNextPageParam: (lastPage) => {
      const next = lastPage?.data?.last_item_id;
      return next ? next : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return {
        items: data.pages.flatMap((page) => page.data.items),
        total_count: data.pages[0].data.total_count,
      };
    },
  });
};

export const usePlacePopup = (order: 'latest' | 'deadline' = 'latest', size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['placePopup', size, order],
    queryFn: ({ pageParam = 0 }) => PlaceService.getPlacePopup(size, pageParam, order),
    getNextPageParam: (lastPage) => {
      const next = lastPage?.data?.last_item_id;
      return next ? next : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return {
        items: data.pages.flatMap((page) => page.data.items),
        total_count: data.pages[0].data.total_count,
      };
    },
  });
};

export const usePlaceDetail = (uuid: string) => {
  return useQuery({
    queryKey: ['placeDetail', uuid],
    queryFn: () => PlaceService.getPlaceDetail(uuid),
  });
};
