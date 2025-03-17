import Button from '../Button';
import { SocialLoginButtonProps } from '../types';
import { ButtonVariantsProps } from '../variants';
import SvgIcon from '@/components/SvgIcon';
import { SNSType } from '@/components/SvgIcon/type';

const snsStyles: Record<
  SNSType,
  {
    label: string;
    bgColor: ButtonVariantsProps['bgColor'];
    textColor: ButtonVariantsProps['textColor'];
  }
> = {
  kakao: { label: '카카오톡', bgColor: 'kakao-yellow', textColor: 'gray-900' },
  naver: { label: '네이버', bgColor: 'naver-green', textColor: 'white' },
  google: { label: '구글', bgColor: 'google-gray', textColor: 'gray-900' },
};

export default function SocialLoginButton({ snsName, ...rest }: SocialLoginButtonProps) {
  const { label, bgColor, textColor } = snsStyles[snsName];

  return (
    <Button fullWidth height={48} rounded={8} bgColor={bgColor} textColor={textColor} {...rest}>
      <SvgIcon name={snsName} width={22} height={22} />
      <span className="ml-2 font-bold">{label} 로그인</span>
    </Button>
  );
}
