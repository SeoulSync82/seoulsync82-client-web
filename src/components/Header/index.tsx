import React from 'react';
import { useLocation } from 'react-router';
import { headerVariants } from './variants';
import HomeHeader from './HomeHeader';
import DefaultHeader from './DefaultHeader';
import useHeaderActions from '@/hooks/useHeaderActions';

interface HeaderProps {
  pageName: string;
  rightActions?: React.ReactNode;
}
interface HeaderConfigItem {
  match: (path: string, search: string) => boolean;
  pageName: string;
  Component: React.FC<HeaderProps>;
  rightActions?: React.ReactNode;
}

const Header: React.FC = () => {
  const location = useLocation();
  const { pathname, search } = location;
  const { getRightActions } = useHeaderActions();

  const headerConfig: HeaderConfigItem[] = [
    {
      match: (p) => p === '/',
      pageName: '홈',
      Component: HomeHeader,
    },
    {
      match: (p) => p.startsWith('/my-page/edit-profile'),
      pageName: '프로필 수정',
      Component: DefaultHeader,
      rightActions: getRightActions(),
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
      rightActions: getRightActions(),
    },
    {
      match: (p) => p.startsWith('/course-history'),
      pageName: '코스 추천 내역',
      Component: DefaultHeader,
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
      match: (p, s) => p.startsWith('/community') && !s.includes('me=true'),
      pageName: '커뮤니티',
      Component: DefaultHeader,
    },
    {
      match: (p, s) => p.startsWith('/community') && s.includes('me=true'),
      pageName: '내가 작성한 글',
      Component: DefaultHeader,
    },
    {
      match: (p) => p.startsWith('/review'),
      pageName: '커뮤니티 글쓰기',
      Component: DefaultHeader,
      rightActions: getRightActions(),
    },
    {
      match: (p) => p.startsWith('/comment'),
      pageName: '한줄평 작성',
      Component: DefaultHeader,
      rightActions: getRightActions(),
    },
    {
      match: () => true,
      pageName: '',
      Component: DefaultHeader,
    },
  ];

  const { Component, pageName, rightActions } = headerConfig.find((c) =>
    c.match(pathname, search),
  )!;

  return (
    <header className={headerVariants({ isHomePage: pathname === '/' })}>
      <Component pageName={pageName as string} rightActions={rightActions} />
    </header>
  );
};

export default Header;
