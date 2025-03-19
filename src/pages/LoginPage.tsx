import SvgIcon from '@/components/SvgIcon';
import Tooltip from '@/components/Tooltip';
import { SNSType } from '@/components/SvgIcon/type';
import { SocialLoginButton } from '@/components/Button';
import Service from '@/service/Service';

const SNS_LIST = ['kakao', 'naver', 'google'];

export default function Login() {
  const onClickLogin = (authType: (typeof SNS_LIST)[number]) => {
    const service = new Service();
    const socialLoginUrl = `${service.service.defaults.baseURL}/auth/login/${authType}`;
    window.location.href = socialLoginUrl;
  };

  return (
    <div className="page">
      <div className="max-container flex h-[88dvh] items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <SvgIcon name="LogoSeoulsync" width={169} height={169} />
          <Tooltip
            size="small"
            direction="bottomMiddle"
            message="⚡️ 로그인하고 나에게 맞는 코스를 추천 받아보세요!"
            className="mb-[15px] mt-[70px]"
          />
          <div className="flex w-full flex-col items-center justify-center gap-[12px]">
            {SNS_LIST.map((snsName: (typeof SNS_LIST)[number]) => (
              <SocialLoginButton
                key={snsName}
                snsName={snsName as SNSType}
                onClick={() => onClickLogin(snsName)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
