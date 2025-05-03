import { SNSType } from '@/components/SvgIcon/type';
import Service from '@/service/Service';
import { useUserLogout } from '@/service/user/useUserService';

const useLogin = () => {
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));
  const { mutate: userLogout } = useUserLogout();

  const handleLogin = (authType: SNSType) => {
    const service = new Service();
    const socialLoginUrl = `${service.service.defaults.baseURL}/auth/login/${authType}`;
    window.location.href = socialLoginUrl;
  };

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  return { isLoggedIn, handleLogin, handleLogout };
};

export default useLogin;
