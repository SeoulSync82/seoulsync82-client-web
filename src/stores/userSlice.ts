import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface UserProfile {
  name: string;
  profile_image: string;
  uuid: string;
  type: string;
  created_at: string;
}
export interface UserProfileStore {
  userProfile: UserProfile;
  userNameValidation: {
    message: string;
    errorMessage: string;
  };
  setUserProfile: (userProfile: Partial<UserProfileStore['userProfile']>) => void;
  setUserNameValidation: (
    userNameValidation: Partial<UserProfileStore['userNameValidation']>,
  ) => void;
}

const useUserStore = create(
  immer<UserProfileStore>((set) => ({
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

export default useUserStore;
