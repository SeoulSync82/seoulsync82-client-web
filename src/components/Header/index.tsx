import React from 'react';
import { useLocation } from 'react-router';
import HomeHeader from './HomeHeader';
import DefaultHeader from './DefaultHeader';
import { headerVariants } from './variants';

type HeaderProps = {
  pageName: string;
  rightActions?: React.ReactNode;
};

type HeaderConfigItem = {
  match: (path: string) => boolean;
  pageName: string;
  Component: React.FC<HeaderProps>;
  rightActions?: React.ReactNode;
};

export const headerConfig: HeaderConfigItem[] = [
  {
    match: (p) => p === '/',
    pageName: '홈',
    Component: HomeHeader,
  },
  {
    match: (p) => p.startsWith('/my-page/edit-profile'),
    pageName: '프로필 수정',
    Component: DefaultHeader,
    rightActions: <button>확인</button>,
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
    match: (p) => p.startsWith('/courseDetail'),
    pageName: '코스 상세',
    Component: DefaultHeader,
    rightActions: <button>공유하기</button>,
  },
  {
    match: (p) => p.startsWith('/exhibition'),
    pageName: '전시회',
    Component: DefaultHeader,
  },
  {
    match: (p) => p.startsWith('/popup'),
    pageName: '팝업',
    Component: DefaultHeader,
  },
  {
    match: (p) => p.startsWith('/map'),
    pageName: '지도',
    Component: DefaultHeader,
  },
  {
    match: (p) => p.startsWith('/culture'),
    pageName: '문화',
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

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { Component, pageName, rightActions } = headerConfig.find((c) => c.match(pathname))!;

  return (
    <header className={headerVariants({ isHomePage: pathname === '/' })}>
      <Component pageName={pageName} rightActions={rightActions} />
    </header>
  );
};

export default Header;
