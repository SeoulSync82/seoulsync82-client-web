import withAuthGuard from '@/hoc/withAuthGuard';
import SvgIcon from '@/components/SvgIcon';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <div className="page w-full overflow-y-auto bg-white">
      <LoginBannerSection />
      <MySection />
      <Divider />
      <ServiceUsageSection />
      <Divider />
      <UserInfoManagementSection />
    </div>
  );
};

const LoginBannerSection = () => {
  return (
    <section className="max-container mt-4 h-24 px-5">
      <div className="flex items-center justify-between gap-2 rounded-md bg-gray-50 px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <SvgIcon name="MyPage" width={32} height={36} color="#DEE2E6" active />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-gray-900">로그인이 필요해요</span>
            <span className="text-sm font-bold text-primary-500">빠르게 로그인하기!</span>
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
        <MenuListItem iconName="Heart" text="좋아요한 글" to="/community" />
        <MenuListItem iconName="Bookmark" text="북마크" to="/course?type=liked" />
      </ul>
    </section>
  );
};

const ServiceUsageSection = () => {
  return (
    <section className="max-container mt-5 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">서비스 이용</h2>
      <ul className="mt-5 space-y-6 pb-5">
        <MenuListItem iconName="Notice" text="공지사항" to="/my-page/notice" />
        {/* <MenuListItem iconName="Alarm" text="알림설정" to="/my-page/alarm-settings" /> */}
        {/* <MenuListItem
          iconName="App"
          text="앱 버전"
          subText={
            <div className="ml-2 flex items-center text-sm text-gray-300">
              <span className="text-primary-500">업데이트</span>가 필요해요!
            </div>
          }
          version="1.0.2"
        /> */}
      </ul>
    </section>
  );
};

const UserInfoManagementSection = () => {
  return (
    <section className="mt-5 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">회원정보 관리</h2>
      <ul className="mt-5 space-y-6 pb-5 text-sm font-medium text-gray-600">
        <MenuListItem text="소셜로그인 정보" to="/my-page/social-login-info" />
        <MenuListItem text="로그인" to="/login" />
      </ul>
    </section>
  );
};

const MenuListItem = ({
  iconName,
  text,
  subText,
  version,
  to,
}: {
  text: string;
  subText?: ReactNode;
  iconName?: string;
  version?: string;
  to?: string;
}) => {
  const TextWithIcon = () => {
    return (
      <div className="flex items-center">
        {iconName && (
          <SvgIcon name={iconName} width={24} height={24} color="#ADB5BD" className="mr-3" />
        )}
        <span className="text-lg font-normal leading-6 text-gray-600">{text}</span>
        {subText}
      </div>
    );
  };

  const Component = to ? Link : 'div';

  return (
    <Component to={to as string} className="flex items-center justify-between">
      <TextWithIcon />
      {version && <div className="text-base text-gray-400">{version}</div>}
    </Component>
  );
};

const Divider = () => {
  return <hr className="h-3 w-full border-[#ededed] bg-gray-100" />;
};

export default withAuthGuard(MyPage);
