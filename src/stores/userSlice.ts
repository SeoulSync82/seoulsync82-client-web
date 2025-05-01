import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface UserProfileState {
  userProfile: {
    name: string;
    profile_image: string;
    uuid: string;
    type: string;
    created_at: string;
    email: string;
    id: string;
  };
  userNameValidation: {
    message: string;
    errorMessage: string;
  };
  setUserProfile: (userProfile: Partial<UserProfileState['userProfile']>) => void;
  setUserNameValidation: (
    userNameValidation: Partial<UserProfileState['userNameValidation']>,
  ) => void;
}

export const useUserStore = create(
  immer<UserProfileState>((set) => ({
    userProfile: {
      name: '',
      profile_image: '',
      uuid: '',
      type: '',
      created_at: '',
      email: '',
      id: '',
    },
    userNameValidation: {
      message: '',
      errorMessage: '',
    },
    setUserProfile: (userProfile) =>
      set((state) => {
        Object.assign(state.userProfile, userProfile);
      }),
    setUserNameValidation: (userNameValidation) =>
      set((state) => {
        Object.assign(state.userNameValidation, userNameValidation);
      }),
  })),
);
