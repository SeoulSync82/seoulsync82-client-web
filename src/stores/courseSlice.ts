import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PlaceItemType } from '@/service/course/types';
import { DEFAULT_LINE_UUID } from '@/constants';

const initialCustomCourseData = {
  subwayData: {
    lineUuid: DEFAULT_LINE_UUID,
    stationUuid: '',
    themeUuid: '',
  },
  courseData: {
    uuid: '',
    name: '',
    places: [] as PlaceItemType[],
  },
  selectedPlace: '',
};

export interface CustomCourseStore {
  customCourseData: typeof initialCustomCourseData;
  setCustomCourseData: (courseData: Partial<typeof initialCustomCourseData>) => void;
  resetCustomCourseData: () => void;
}

const useCourseStore = create(
  persist(
    immer<CustomCourseStore>((set) => ({
      customCourseData: initialCustomCourseData,
      setCustomCourseData: (data) =>
        set((state) => {
          Object.assign(state.customCourseData, data);
        }),
      resetCustomCourseData: () =>
        set((state) => {
          state.customCourseData = initialCustomCourseData;
        }),
    })),
    {
      name: 'course-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useCourseStore;
