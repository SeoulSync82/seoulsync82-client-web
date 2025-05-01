import { useUserProfile } from '@/service/user/useUserService';
import { useUserStore } from '@/stores/userSlice';

const useLogin = () => {
  const isLoggedIn = localStorage.getItem('accessToken') !== null;

  const { data: userProfileData } = useUserProfile({ enabled: !!isLoggedIn });
  const { setUserProfile } = useUserStore();

  setUserProfile(userProfileData?.data);

  return { isLoggedIn, userProfileData };
};

export default useLogin;
