// import withAuthGuard from '@/hoc/withAuthGuard';
import SvgIcon from '@/components/SvgIcon';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useUserLogout, useUserProfile } from '@/service/user/useUserService';
import Image from '@/components/Image';
const MyPage = () => {
  const isLoggedIn = localStorage.getItem('accessToken') !== null;
  const { data: userProfile } = useUserProfile({ enabled: !!isLoggedIn });

  return (
    <div className="page w-full overflow-y-auto bg-white">
      <LoginBannerSection userProfile={userProfile?.data} />
      <MySection />
      <Divider />
      <ServiceUsageSection />
      <Divider />
      <UserInfoManagementSection isLoggedIn={!!userProfile?.data.name} />
    </div>
  );
};

const LoginBannerSection = ({ userProfile }: { userProfile: any }) => {
  return (
    <section className="max-container mt-4 h-24 px-5">
      <div className="flex items-center justify-between gap-2 rounded-md bg-gray-50 px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white">
            {userProfile?.profile_image ? (
              <Image src={userProfile?.profile_image} alt="profile" />
            ) : (
              <SvgIcon name="MyPage" width={32} height={36} color="#DEE2E6" active />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-gray-900">
              {userProfile?.name || '로그인이 필요해요'}
            </span>
            {userProfile?.name ? (
              <span className="text-sm font-normal text-gray-400">
                <span className="font-bold text-primary-500">카카오톡</span>에서 마지막 로그인!
              </span>
            ) : (
              <Link to="/login" className="text-sm font-bold text-primary-500">
                빠르게 로그인하기!
              </Link>
            )}
          </div>
        </div>
        {/* <SvgIcon name="Chevron" width={16} height={16} /> */}
      </div>
    </section>
  );
};

const MySection = () => {
  return (
    <section className="max-container mt-8 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">MY</h2>
      <ul className="mt-5 space-y-6 pb-5 text-sm font-medium text-gray-600">
        <MenuListItem iconName="Write" text="내가 작성한 글" to="/my-page" />
        <MenuListItem iconName="Bookmark" text="북마크" to="/course?type=liked" />
      </ul>
    </section>
  );
};

/* TODO: 공지사항 추후 논의 */
const ServiceUsageSection = () => {
  return (
    <section className="max-container mt-5 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">서비스 이용</h2>
      <ul className="mt-5 space-y-6 pb-5">
        <MenuListItem iconName="Notice" text="공지사항" to="/my-page/notice" />
      </ul>
    </section>
  );
};

const UserInfoManagementSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { mutate: userLogout } = useUserLogout();

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem('accessToken');
    window.location.href = '/my-page';
  };

  return (
    <section className="mt-5 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">회원정보 관리</h2>
      <ul className="mt-5 space-y-6 pb-5 text-sm font-medium text-gray-600">
        <MenuListItem text="소셜로그인 정보" to="/my-page/social-login-info" />
        <MenuListItem
          text={isLoggedIn ? '로그아웃' : '로그인'}
          to={!isLoggedIn ? '/login' : undefined}
          onClick={isLoggedIn ? handleLogout : undefined}
        />
      </ul>
    </section>
  );
};

const MenuListItem = ({
  iconName,
  text,
  to,
  onClick,
}: {
  text: string;
  subText?: ReactNode;
  iconName?: string;
  version?: string;
  to?: string | null;
  onClick?: () => void;
}) => {
  const Component = to ? Link : 'div';

  return (
    <Component
      to={to as string}
      className="flex items-center justify-between hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        {iconName && (
          <SvgIcon name={iconName} width={24} height={24} color="#ADB5BD" className="mr-3" />
        )}
        <span className="text-lg font-normal leading-6 text-gray-600">{text}</span>
      </div>
    </Component>
  );
};

const Divider = () => {
  return <hr className="h-3 w-full border-[#ededed] bg-gray-100" />;
};

export default MyPage;
