import { create } from 'zustand';

interface BoundStoreState {
  lineUuid: string;
  stationUuid: string;
  themeUuid: string;
  customPlaceList: string[];
  customPlaceType: string;
}

interface BoundStoreActions {
  setLineUuid: (lineUuid: string) => void;
  setStationUuid: (stationUuid: string) => void;
  setThemeUuid: (themeUuid: string) => void;
  setCustomPlaceList: (placeUuidList: string[]) => void;
  setCustomPlaceType: (custumPlaceType: string) => void;
}

export const DEFAULT_LINE_UUID = '077ff3adc0e556148bf7eeb7a0273fb9'; // 1호선

export const useBoundStore = create<BoundStoreState & BoundStoreActions>((set, get) => ({
  lineUuid: DEFAULT_LINE_UUID,
  stationUuid: '',
  themeUuid: '',
  customPlaceList: [],
  customPlaceType: '',
  setLineUuid: (lineUuid: string) => set({ lineUuid }),
  setStationUuid: (stationUuid: string) => set({ stationUuid }),
  setThemeUuid: (themeUuid: string) => set({ themeUuid }),
  setCustomPlaceList: (customPlaceList: string[]) => set({ customPlaceList }),
  setCustomPlaceType: (customPlaceType: string) => set({ customPlaceType }),
}));
