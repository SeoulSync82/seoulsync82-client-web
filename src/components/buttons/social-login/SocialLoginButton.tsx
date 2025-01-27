import Service from '@/service/Service';
import Button from '../Button';
import SVGIcon from '@/components/svg-icon/SVGIcon';
import { ButtonColor, ButtonSize } from '../types';
import { SNSType } from '@/components/svg-icon/type';

export default function SocialLoginButton({
  size,
  snsType,
}: {
  size?: ButtonSize;
  snsType: SNSType;
}) {
  const snsTypes = {
    kakao: { label: '카카오톡', bgColor: 'kakaoYellow', textColor: 'gray900', icon: 'kakao' },
    naver: { label: '네이버', bgColor: 'naverGreen', textColor: 'white', icon: 'naver' },
    google: { label: '구글', bgColor: 'googleGray', textColor: 'gray900', icon: 'google' },
  };

  const onClickLogin = (authType: 'kakao' | 'naver' | 'google') => {
    const serviceInstance = new Service();
    const socialLoginUrl = `${serviceInstance.service.defaults.baseURL}/user/login/${authType}`;
    window.location.href = socialLoginUrl;
  };

  return (
    <Button
      size={size}
      bgColor={snsTypes[snsType].bgColor as ButtonColor}
      textColor={snsTypes[snsType].textColor as ButtonColor}
      rounded="medium"
      onClick={() => onClickLogin(snsType)}
    >
      <SVGIcon name={snsTypes[snsType].icon as SNSType} width={22} height={22} />
      <span className="ml-2 font-bold">{snsTypes[snsType].label}로 계속하기</span>
    </Button>
  );
}
