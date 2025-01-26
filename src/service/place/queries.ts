import PlaceService from './PlaceService';

const queryKeys = {
  getPlaceCulture: ['placeCulture'] as const,
  getPlaceCultureDetail: ['placeCultureDetail'] as const,
  getPlaceExhibition: ['placeExhibition'] as const,
  getPlacePopup: ['placePopup'] as const,
  getPlaceDetail: ['placeDetail'] as const,
};

export const queryOptions = {
  getPlaceCulture: (size: number, last_id: number = 0) => ({
    queryKey: queryKeys.getPlaceCulture,
    queryFn: () => PlaceService.getPlaceCulture(size, last_id),
  }),
  getPlaceCultureDetail: (uuid: string) => ({
    queryKey: queryKeys.getPlaceCultureDetail,
    queryFn: () => PlaceService.getPlaceCultureDetail(uuid),
  }),
  getPlaceExhibition: (size: number, last_id: number = 0, order: number = 0) => ({
    queryKey: queryKeys.getPlaceExhibition,
    queryFn: () => PlaceService.getPlaceExhibition(size, last_id, order),
  }),
  getPlacePopup: (size: number, last_id: number = 0, order: number = 0) => ({
    queryKey: queryKeys.getPlacePopup,
    queryFn: () => PlaceService.getPlacePopup(size, last_id, order),
  }),
  getPlaceDetail: (uuid: string) => ({
    queryKey: queryKeys.getPlaceDetail,
    queryFn: () => PlaceService.getPlaceDetail(uuid),
  }),
};
