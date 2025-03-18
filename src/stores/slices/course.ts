import { StateCreator } from 'zustand';
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

export interface CourseSlice {
  customCourseData: {
    lineUuid: string | string[];
    stationUuid: string;
    themeUuid: string;
    placeList: string[];
    placeType: string;
    courseUuid: string;
    courseName: string;
  };
  setCustomCourseData: (courseData: {
    lineUuid: string | string[];
    stationUuid: string;
    themeUuid: string;
    placeList: string[];
    placeType: string;
    courseUuid: string;
    courseName: string;
  }) => void;
  resetCustomCourseData: () => void;
}

export const createCourseSlice: StateCreator<CourseSlice> = (set) => ({
  customCourseData: initialCustomCourseData,
  setCustomCourseData: (courseData: {
    lineUuid: string | string[];
    stationUuid: string;
    themeUuid: string;
    placeList: string[];
    placeType: string;
    courseUuid: string;
    courseName: string;
  }) => set({ customCourseData: courseData }),
  resetCustomCourseData: () => set({ customCourseData: initialCustomCourseData }),
});
