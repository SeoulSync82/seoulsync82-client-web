import Button from '../Button';
import SVGIcon from '@/components/svg-icon/SVGIcon';
import { ButtonColor, ButtonSize } from '../types';
import { SNSType } from '@/components/svg-icon/type';

export default function SocialLoginButton({
  size,
  snsType,
  onClick,
}: {
  size?: ButtonSize;
  snsType: SNSType;
  onClick: () => void;
}) {
  const snsTypes = {
    kakao: { label: '카카오톡', bgColor: 'kakaoYellow', textColor: 'gray900', icon: 'kakao' },
    naver: { label: '네이버', bgColor: 'naverGreen', textColor: 'white', icon: 'naver' },
    google: { label: '구글', bgColor: 'googleGray', textColor: 'gray900', icon: 'google' },
  };

  return (
    <Button
      size={size}
      bgColor={snsTypes[snsType].bgColor as ButtonColor}
      textColor={snsTypes[snsType].textColor as ButtonColor}
      rounded="medium"
      onClick={onClick}
    >
      <SVGIcon name={snsTypes[snsType].icon as SNSType} width={22} height={22} />
      <span className="ml-2 font-bold">{snsTypes[snsType].label} 로그인</span>
    </Button>
  );
}
