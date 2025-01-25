import { useLocation, useNavigate } from 'react-router-dom';
import SVGIcon from '@/components/svg-icon/SVGIcon';
import AuthService from '@/service/auth/AuthService';
import { setAccessToken } from '@/utils/auth';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onClickPrevButton = () => {
    navigate(-1);
  };

  // TODO: 로그인 테스트 후 삭제
  const onClickLoginTest = async () => {
    const response = await AuthService.getKakaoAuth();
    response?.data.token && setAccessToken(response.data.token);
    console.log('kakao auth token: ', response?.data.token);
  };

  return (
    <header
      className={
        pathname.replace('/', '') || 'home'
          ? 'left-0 top-0 flex h-[60px] w-full items-center justify-between px-[20px]'
          : 'left-0 top-0 flex h-12 w-full items-center px-5 text-center'
      }
    >
      {pathname.replace('/', '') || 'home' ? (
        <div className="flex h-full w-full items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <SVGIcon width={28} height={36} name="HeaderLogo" />
            <SVGIcon width={72} height={32} name="HeaderTypo" />
          </div>
          <div className="flex max-w-[72px] items-center gap-[8px]">
            <SVGIcon
              style="mr-2"
              width={32}
              height={32}
              name="Alarm"
              active={false}
              onClick={onClickLoginTest}
            />
            <SVGIcon width={32} height={32} name="Search" />
          </div>
        </div>
      ) : (
        <div className="relative flex size-full items-center">
          <SVGIcon
            name="LeftArrow"
            width={30}
            height={30}
            active={false}
            onClick={onClickPrevButton}
            color="#000"
          />
          <p className="absolute left-1/2 top-1/2 max-h-[48px] max-w-[50%] -translate-x-1/2 -translate-y-1/2  text-16 font-bold text-[#101010]">
            {pathname.replace('/', '')}
          </p>
        </div>
      )}
    </header>
  );
}
