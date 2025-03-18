import { create } from 'zustand';
import { createCourseSlice, CourseSlice } from './slices/course';
import { createUserSlice } from './slices/user';

export type AppState = CourseSlice;

// TODO: zustand immer 사용
export const useBoundStore = create<AppState>()((...args) => ({
  ...createCourseSlice(...args),
  ...createUserSlice(...args),
}));
