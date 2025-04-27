import { useLocation } from 'react-router';
import DefaultHeader from './DefaultHeader';
import HomeHeader from './HomeHeader';
import { headerVariants } from './variants';

const headerPageNames = {
  '/my-page/edit-profile': '프로필 수정',
  '/my-page/social-login-info': '소셜 로그인 정보',
  '/my-page/notice': '공지사항',
  '/my-page': '마이페이지',
  '/courseDetail': '코스 상세',
  '/exhibition': '전시회',
  '/popup': '팝업',
  '/map': '지도',
  '/culture': '문화',
  '/course': '내 코스',
  '/ai-recommend': 'AI 추천',
  '/community': '커뮤니티',
  '/': '홈',
} as const;

const headerPathComponents: Record<
  string,
  (props: { pageName: string; rightActions?: React.ReactNode; key?: React.Key }) => React.ReactNode
> = {
  '/my-page/edit-profile': (props) => (
    <DefaultHeader {...props} rightActions={<button>확인</button>} />
  ),
  '/my-page/social-login-info': (props) => <DefaultHeader {...props} />,
  '/my-page/notice': (props) => <DefaultHeader {...props} />,
  '/my-page': (props) => <DefaultHeader {...props} />,
  '/courseDetail': (props) => <DefaultHeader {...props} rightActions={<button>공유하기</button>} />,
  '/exhibition': (props) => <DefaultHeader {...props} />,
  '/popup': (props) => <DefaultHeader {...props} />,
  '/map': (props) => <DefaultHeader {...props} />,
  '/culture': (props) => <DefaultHeader {...props} />,
  '/course': (props) => <DefaultHeader {...props} />,
  '/ai-recommend': (props) => <DefaultHeader {...props} />,
  '/community': (props) => <DefaultHeader {...props} />,
  '/': (props) => <HomeHeader {...props} />,
} as const;

const Header = () => {
  const { pathname } = useLocation();

  const component = Object.entries(headerPathComponents).find(([path]) => {
    const isMatch = pathname === path || pathname.startsWith(path);
    console.log(`Checking path: ${path}, Match: ${isMatch}`);
    return isMatch;
  })?.[1];

  const HeaderComponent = component || (({ pageName }) => <DefaultHeader pageName={pageName} />);

  return (
    <header className={headerVariants({ isHomePage: pathname === '/' })}>
      <HeaderComponent pageName={headerPageNames[pathname as keyof typeof headerPageNames]} />
    </header>
  );
};

export default Header;
