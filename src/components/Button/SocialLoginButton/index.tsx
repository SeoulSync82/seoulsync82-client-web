import { Button } from '..';
import SVGIcon from '@/components/SvgIcon';
import { SNSType } from '@/components/SvgIcon/type';
import { ButtonProps } from '../Button';
import { ButtonVariantsProps } from '../variants';

const snsStyles: Record<
  SNSType,
  {
    label: string;
    bgColor: ButtonVariantsProps['bgColor'];
    textColor: ButtonVariantsProps['textColor'];
  }
> = {
  kakao: { label: '카카오톡', bgColor: 'kakaoYellow', textColor: 'gray900' },
  naver: { label: '네이버', bgColor: 'naverGreen', textColor: 'white' },
  google: { label: '구글', bgColor: 'googleGray', textColor: 'gray900' },
};

interface SocialLoginButtonProps extends ButtonProps {
  snsName: keyof typeof snsStyles;
}

export default function SocialLoginButton({ snsName, ...rest }: SocialLoginButtonProps) {
  const { label, bgColor, textColor } = snsStyles[snsName];

  return (
    <Button height={48} rounded={16} bgColor={bgColor} textColor={textColor} {...rest}>
      <SVGIcon name={snsName} width={22} height={22} />
      <span className="ml-2 font-bold">{label} 로그인</span>
    </Button>
  );
}
