import SubwayService from './SubwayService';

const queryKeys = {
  getSubwayLines: ['subwayLines'] as const,
  getSubwayStations: (line_uuid: string) => ['subwayStations', line_uuid] as const,
  getSubwayStationCustom: ['subwayStationCustom'] as const,
};

export const queryOptions = {
  getSubwayLines: () => ({
    queryKey: queryKeys.getSubwayLines,
    queryFn: () => SubwayService.getSubwayLines(),
  }),
  getSubwayStations: (line_uuid: string, { enabled }: { enabled?: boolean }) => ({
    queryKey: queryKeys.getSubwayStations(line_uuid),
    queryFn: () => SubwayService.getSubwayStations(line_uuid),
    enabled,
  }),
  getSubwayStationCustom: (line_uuid: string, station_uuid: string, place_uuids: string) => ({
    queryKey: queryKeys.getSubwayStationCustom,
    queryFn: () => SubwayService.getSubwayStationCustom(line_uuid, station_uuid, place_uuids),
  }),
};
