import { StateCreator } from 'zustand';
import { DEFAULT_LINE_UUID } from '@/constants';

export interface CourseSlice {
  lineUuid: string;
  stationUuid: string;
  themeUuid: string;
  customPlaceList: string[];
  customPlaceType: string;
  setLineUuid: (lineUuid: string) => void;
  setStationUuid: (stationUuid: string) => void;
  setThemeUuid: (themeUuid: string) => void;
  setCustomPlaceList: (placeUuidList: string[]) => void;
  setCustomPlaceType: (custumPlaceType: string) => void;
}

export const createCourseSlice: StateCreator<CourseSlice> = (set, get) => ({
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
});
