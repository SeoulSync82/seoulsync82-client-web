import useCourseStore from './courseSlice';
import useUserStore from './userSlice';

export const useAppStore = () => ({
  ...useCourseStore(),
  ...useUserStore(),
});
