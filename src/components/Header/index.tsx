import React from 'react';
import { useLocation } from 'react-router';
import HomeHeader from './HomeHeader';
import DefaultHeader from './DefaultHeader';
import { headerVariants } from './variants';
import useUserStore from '@/stores/userSlice';
import { cn } from '@/utils/tailwindcss';
import { useEditProfile } from '@/pages/MyPage/EditProfilePage';

interface HeaderProps {
  pageName: string;
  rightActions?: React.ReactNode;
}

interface HeaderConfigItem {
  match: (path: string) => boolean;
  pageName: string;
  Component: React.FC<HeaderProps>;
  rightActions?: React.ReactNode;
}

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { userProfile, userNameValidation } = useUserStore();
  const { handleEditProfile } = useEditProfile();

  const makeHeaderConfig = (): HeaderConfigItem[] => {
    return [
      {
        match: (p) => p === '/',
        pageName: '홈',
        Component: HomeHeader,
      },
      {
        match: (p) => p.startsWith('/my-page/edit-profile'),
        pageName: '프로필 수정',
        Component: DefaultHeader,
        rightActions: (
          // TODO: Button 컴포넌트 확장 적용
          <button
            className={cn('text-base font-bold', {
              'text-primary-500': userProfile.name,
              'text-gray-400': !userProfile.name || userNameValidation.errorMessage,
            })}
            onClick={handleEditProfile}
          >
            완료
          </button>
        ),
      },
      {
        match: (p) => p.startsWith('/my-page/social-login-info'),
        pageName: '소셜 로그인 정보',
        Component: DefaultHeader,
      },
      {
        match: (p) => p.startsWith('/my-page/notice'),
        pageName: '공지사항',
        Component: DefaultHeader,
      },
      {
        match: (p) => p.startsWith('/my-page'),
        pageName: '마이페이지',
        Component: DefaultHeader,
      },
      {
        match: (p) => p.startsWith('/course/'),
        pageName: '코스 상세',
        Component: DefaultHeader,
        rightActions: <button>공유하기</button>,
      },
      {
        match: (p) => p.startsWith('/map'),
        pageName: '지도',
        Component: DefaultHeader,
      },
      {
        match: (p) => p.startsWith('/culture'),
        pageName: '큐레이션',
        Component: DefaultHeader,
      },
      {
        match: (p) => p.startsWith('/course'),
        pageName: '내 코스',
        Component: DefaultHeader,
      },
      {
        match: (p) => p.startsWith('/ai-recommend'),
        pageName: 'AI 추천',
        Component: DefaultHeader,
      },
      {
        match: (p) => p.startsWith('/community'),
        pageName: '커뮤니티',
        Component: DefaultHeader,
      },
      // fallback ‑ 매칭되지 않는 모든 경로
      {
        match: () => true,
        pageName: '',
        Component: DefaultHeader,
      },
    ];
  };

  const { Component, pageName, rightActions } = makeHeaderConfig().find((c) => c.match(pathname))!;

  return (
    <header className={headerVariants({ isHomePage: pathname === '/' })}>
      <Component pageName={pageName as string} rightActions={rightActions} />
    </header>
  );
};

export default Header;
