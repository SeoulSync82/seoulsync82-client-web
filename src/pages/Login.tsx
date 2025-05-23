import SvgIcon from '@/components/SvgIcon';
import Tooltip from '@/components/Tooltip';
import { SNSType } from '@/components/SvgIcon/type';
import { SocialLoginButton } from '@/components/Button';
import useLogin from '@/hooks/useLogin';

const SNS_LIST: SNSType[] = ['kakao', 'naver', 'google'];

export default function LoginPage() {
  const { handleLogin } = useLogin();

  return (
    <div className="page max-container flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <SvgIcon name="LogoSeoulsync" width={168} height={168} />
        <Tooltip
          size="small"
          direction="bottomMiddle"
          message="⚡️ 로그인하고 나에게 맞는 코스를 추천 받아보세요!"
          className="mt-18 mb-4"
        />
        <SocialLoginSection onClickLogin={handleLogin} />
      </div>
    </div>
  );
}

const SocialLoginSection = ({ onClickLogin }: { onClickLogin: (authType: SNSType) => void }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      {SNS_LIST.map((snsName) => (
        <SocialLoginButton key={snsName} snsName={snsName} onClick={() => onClickLogin(snsName)} />
      ))}
    </div>
  );
};
