import { create } from 'zustand';
import { createCourseSlice, CourseSlice } from './slices/course';

export type AppState = CourseSlice;

export const useBoundStore = create<AppState>()((...args) => ({
  ...createCourseSlice(...args),
}));
