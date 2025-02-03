import { useMutation } from '@tanstack/react-query';
import CourseService from './CourseService';
import { SaveCourseRecommendReqData } from './types';

export const useSaveRecommendCourse = () => {
  return useMutation({
    mutationFn: (data: SaveCourseRecommendReqData) => CourseService.saveCourseRecommend(data),
  });
};
