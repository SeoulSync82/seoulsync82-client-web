import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/clsx';
import HomeHeader from './home/HomeHeader';
import DefaultHeader from './default/DefaultHeader';

const headerVariants = cva('left-0 top-0 flex h-[60px] w-full items-center', {
  variants: {
    isHomePage: {
      true: 'justify-between px-[20px]',
      false: 'px-5 text-center',
    },
  },
  defaultVariants: {
    isHomePage: true,
  },
});

export default function Header() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  const { id } = useParams<{ id: string }>();
  const pageName = useMemo(() => {
    const pageTitles: Record<string, string> = {
      '/login': '로그인',
      '/course': '내 코스',
      '/ai-recommend': 'AI 추천',
      '/community': '커뮤니티',
      '/my-page': '마이페이지',
      '/culture': '큐레이션',
      '/notifications': '알림',
      '/culture/exhibition/:id': '전시',
      '/culture/popup/:id': '팝업',
    };

    if (pathname.startsWith('/course/') && id) {
      return '코스 상세';
    }
    if (pathname.startsWith('/culture/exhibition/') && id) {
      return '전시';
    }
    if (pathname.startsWith('/culture/popup/') && id) {
      return '팝업';
    }

    return pageTitles[pathname] ?? '';
  }, [pathname, id]);

  return (
    <header className={cn(headerVariants({ isHomePage }))}>
      {isHomePage ? <HomeHeader /> : <DefaultHeader pageName={pageName} />}
    </header>
  );
}
