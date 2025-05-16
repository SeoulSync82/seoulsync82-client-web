import SvgIcon from '@/components/SvgIcon';
import { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile, UserProfileStore } from '@/stores/userSlice';
import useUserStore from '@/stores/userSlice';
import Image from '@/components/Image';
import useLogin from '@/hooks/useLogin';
import { useUserProfile } from '@/service/user/useUserService';

const MyPage = () => {
  const { isLoggedIn, handleLogout } = useLogin();
  const { data: userProfileData } = useUserProfile({ enabled: !!isLoggedIn });
  const setUserProfile = useUserStore((state: UserProfileStore) => state.setUserProfile);

  useEffect(() => {
    if (userProfileData?.data) {
      setUserProfile(userProfileData.data);
    }
  }, [userProfileData?.data, setUserProfile]);

  return (
    <div className="page w-full overflow-y-auto bg-white">
      <LoginBannerSection isLoggedIn={isLoggedIn} userProfile={userProfileData?.data} />
      <MySection />
      <Divider />
      <ServiceUsageSection />
      <Divider />
      <UserInfoManagementSection isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </div>
  );
};

const LoginBannerSection = ({
  isLoggedIn,
  userProfile,
}: {
  isLoggedIn: boolean;
  userProfile: UserProfile;
}) => {
  const snsTypes = {
    kakao: '카카오톡',
    google: '구글',
    apple: '애플',
    naver: '네이버',
  };
  const navigate = useNavigate();

  return (
    <section className="max-container mt-4 h-24 px-5">
      {isLoggedIn ? (
        <div
          className="flex items-center gap-3 rounded-md bg-gray-50 px-5 py-4"
          onClick={() => {
            navigate('/my-page/edit-profile', { state: userProfile });
          }}
        >
          <UserProfileImage profileImage={userProfile?.profile_image} />
          <UserProfileInfo isLoggedIn={isLoggedIn} userProfile={userProfile} snsTypes={snsTypes} />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-md bg-gray-50 px-5 py-4">
          <UserProfileImage profileImage={userProfile?.profile_image} />
          <UserProfileInfo isLoggedIn={isLoggedIn} userProfile={userProfile} snsTypes={snsTypes} />
        </div>
      )}
    </section>
  );
};

const UserProfileImage = ({ profileImage }: { profileImage: string }) => (
  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white">
    {profileImage ? (
      <Image src={profileImage} alt="profile" />
    ) : (
      <SvgIcon name="MyPage" width={32} height={36} color="#DEE2E6" active />
    )}
  </div>
);

const UserProfileInfo = ({
  isLoggedIn,
  userProfile,
  snsTypes,
}: {
  isLoggedIn: boolean;
  userProfile: UserProfile;
  snsTypes: any;
}) => {
  const userName = userProfile?.name;
  const userType = userProfile?.type as keyof typeof snsTypes;
  const loginMessage = isLoggedIn ? (
    <div className="text-sm font-normal text-gray-400">
      <span className="font-bold text-primary-500">{snsTypes[userType]}</span>에서 마지막 로그인!
    </div>
  ) : (
    <Link to="/login" className="text-sm font-bold text-primary-500">
      빠르게 로그인하기!
    </Link>
  );

  return (
    <div className="flex flex-col gap-1">
      <span className="text-base font-semibold text-gray-900">
        {isLoggedIn ? userName : '로그인이 필요해요'}
      </span>
      {loginMessage}
    </div>
  );
};

const MySection = () => {
  return (
    <section className="max-container mt-8 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">MY</h2>
      <ul className="mt-5 space-y-6 pb-5 text-sm font-medium text-gray-600">
        <MenuListItem
          iconName="Write"
          text="내가 작성한 글"
          to="/community?me=true&order=popular"
        />
        <MenuListItem iconName="Bookmark" text="북마크" to="/course?type=bookmarked" />
      </ul>
    </section>
  );
};

/* TODO: 공지사항 추후 논의 */
const ServiceUsageSection = () => {
  const openGmailCompose = () => {
    const url =
      'https://mail.google.com/mail/?view=cm' +
      '&to=' +
      encodeURIComponent('zzznly@gmail.com') +
      '&su=' +
      encodeURIComponent('[SeoulSync82] 문의드립니다.') +
      '&body=' +
      encodeURIComponent('성함: ' + '\n' + '연락처: ' + '\n' + '문의 내용: ');
    window.open(url, '_blank');
  };

  return (
    <section className="max-container mt-5 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">서비스 이용</h2>
      <ul className="mt-5 space-y-6 pb-5">
        <MenuListItem iconName="Speaker" text="공지사항" to="/my-page/notice" />
        <MenuListItem iconName="Headphone" text="문의하기" onClick={openGmailCompose} />
      </ul>
    </section>
  );
};

const UserInfoManagementSection = ({
  isLoggedIn,
  handleLogout,
}: {
  isLoggedIn: boolean;
  handleLogout: () => void;
}) => {
  return (
    <section className="mt-5 border-none px-5">
      <h2 className="text-base font-normal text-gray-400">회원정보 관리</h2>
      <ul className="mt-5 space-y-6 pb-5 text-sm font-medium text-gray-600">
        <MenuListItem iconName="App" text="소셜로그인 정보" to="/my-page/social-login-info" />
        <MenuListItem
          iconName={isLoggedIn ? 'Logout' : 'Login'}
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
  const Component = to ? Link : 'a';

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
