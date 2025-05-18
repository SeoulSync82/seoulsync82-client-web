import useCourseStore from './courseSlice';
import useReviewStore from './reviewSlice';
import useUserStore from './userSlice';

export const useAppStore = () => ({
  ...useCourseStore(),
  ...useUserStore(),
  ...useReviewStore(),
});
