import PlaceService from './PlaceService';

const queryKeys = {
  getPlaceCulture: ['placeCulture'] as const,
  getPlaceCultureDetail: ['placeCultureDetail'] as const,
  getPlaceExhibition: (order: 'latest' | 'deadline') => ['placeExhibition', order] as const,
  getPlacePopup: (order: 'latest' | 'deadline') => ['placePopup', order] as const,
  getPlaceDetail: ['placeDetail'] as const,
};

export const queryOptions = {
  getPlaceCulture: (size: number = 10, last_id: number = 0) => ({
    queryKey: queryKeys.getPlaceCulture,
    queryFn: () => PlaceService.getPlaceCulture(size, last_id),
  }),
  getPlaceCultureDetail: (uuid: string) => ({
    queryKey: queryKeys.getPlaceCultureDetail,
    queryFn: () => PlaceService.getPlaceCultureDetail(uuid),
  }),
  getPlaceExhibition: (
    size: number = 10,
    last_id: number = 0,
    order: 'latest' | 'deadline' = 'latest',
  ) => ({
    queryKey: queryKeys.getPlaceExhibition(order),
    queryFn: () => PlaceService.getPlaceExhibition(size, last_id, order),
  }),
  getPlacePopup: (
    size: number = 10,
    last_id: number = 0,
    order: 'latest' | 'deadline' = 'latest',
  ) => ({
    queryKey: queryKeys.getPlacePopup(order),
    queryFn: () => PlaceService.getPlacePopup(size, last_id, order),
  }),
  getPlaceDetail: (uuid: string) => ({
    queryKey: queryKeys.getPlaceDetail,
    queryFn: () => PlaceService.getPlaceDetail(uuid),
  }),
};
