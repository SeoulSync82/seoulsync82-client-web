import SvgIcon from '@/components/SvgIcon';
import withAuthGuard from '@/hoc/withAuthGuard';
import { cn } from '@/utils/tailwindcss';
import { useQueryClient } from '@tanstack/react-query';

const socialLoginList = [
  { name: '카카오', icon: 'kakao', bgColor: 'kakao-yellow', color: '#391B1B' },
  { name: '네이버', icon: 'naver', bgColor: 'naver-green', color: '#fff' },
  { name: '구글', icon: 'google', bgColor: 'google-gray', color: undefined },
  { name: '애플', icon: 'apple', bgColor: 'gray-100', color: '#fff' },
];

const SocialLoginInfoPage = () => {
  const queryClient = useQueryClient();
  const cachedUserProfile = queryClient.getQueryData(['userProfile']) as {
    data: { type: (typeof socialLoginList)[number]['icon'] };
  };
  const activeType = cachedUserProfile?.data?.type;

  return (
    <div className="max-container flex items-center justify-between p-6">
      {socialLoginList.map((item) => (
        <SocialLoginItem key={item.name} item={item} isActive={item.icon === activeType} />
      ))}
    </div>
  );
};

interface SocialLoginItemProps {
  item: (typeof socialLoginList)[number];
  isActive: boolean;
}

const SocialLoginItem = ({ item, isActive }: SocialLoginItemProps) => {
  const itemContainerStyles = cn(
    'relative flex h-20 w-full items-center justify-center rounded-full',
    isActive ? `bg-${item.bgColor}` : 'border border-gray-200 bg-transparent',
  );
  const itemNameStyles = cn(
    'flex items-center justify-center text-sm',
    isActive ? 'font-semibold text-gray-900' : 'font-normal text-gray-400',
  );

  return (
    <div className="flex w-20 flex-col gap-5">
      <div className={itemContainerStyles}>
        <SvgIcon
          name={item.icon}
          color={isActive ? item.color : '#DEE2E6'}
          width={32}
          height={32}
        />
        {isActive && (
          <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary-500">
            <SvgIcon name="Check" color="#fff" width={16} height={16} />
          </div>
        )}
      </div>
      <div className={itemNameStyles}>{item.name}</div>
    </div>
  );
};

export default withAuthGuard(SocialLoginInfoPage);