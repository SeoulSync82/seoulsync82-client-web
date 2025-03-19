import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { PlaceItemType } from '@/service/course/types';
import { DEFAULT_LINE_UUID } from '@/constants';

const initialCustomCourseData = {
  lineUuid: DEFAULT_LINE_UUID,
  stationUuid: '',
  themeUuid: '',
  placeList: [],
  placeType: '',
  courseUuid: '',
  courseName: '',
};

export interface AppState {
  customCourseData: {
    lineUuid: string | string[];
    stationUuid: string;
    themeUuid: string;
    placeList: PlaceItemType[];
    placeType: string;
    courseUuid: string;
    courseName: string;
  };
  setCustomCourseData: (courseData: {
    lineUuid: string | string[];
    stationUuid: string;
    themeUuid: string;
    placeList: PlaceItemType[];
    placeType: string;
    courseUuid: string;
    courseName: string;
  }) => void;
  resetCustomCourseData: () => void;
}

// TODO: zustand immer 사용
export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      customCourseData: initialCustomCourseData,
      setCustomCourseData: (courseData: {
        lineUuid: string | string[];
        stationUuid: string;
        themeUuid: string;
        placeList: PlaceItemType[];
        placeType: string;
        courseUuid: string;
        courseName: string;
      }) => set({ customCourseData: courseData }),
      resetCustomCourseData: () => set({ customCourseData: initialCustomCourseData }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
