import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Review {
  stars: number;
  review: string;
}
export interface ReviewStore {
  stars: number;
  review: string;
  setStars: (stars: number) => void;
  setReview: (review: string) => void;
}

const useReviewStore = create(
  immer<ReviewStore>((set) => ({
    stars: 0,
    review: '',
    setStars: (stars) => set({ stars }),
    setReview: (review) => set({ review }),
  })),
);

export default useReviewStore;
