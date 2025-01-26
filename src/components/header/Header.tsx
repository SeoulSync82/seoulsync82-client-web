import SVGIcon from '@/components/svg-icon/SVGIcon';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/clsx';

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

function HomeHeader() {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="flex items-center gap-[8px]">
        <SVGIcon width={28} height={36} name="HeaderLogo" />
        <SVGIcon width={72} height={32} name="HeaderTypo" />
      </div>
      <div className="flex max-w-[72px] items-center gap-[8px]">
        <SVGIcon className="mr-2" width={32} height={32} name="Alarm" active={false} />
        <SVGIcon width={32} height={32} name="Search" />
      </div>
    </div>
  );
}

function PageHeader({
  pageName,
  onClickPrevButton,
}: {
  pageName: string;
  onClickPrevButton: () => void;
}) {
  return (
    <div className="relative flex h-full w-full items-center">
      <SVGIcon
        name="ArrowLeft"
        width={24}
        height={24}
        active={false}
        onClick={onClickPrevButton}
        color="#000"
      />
      <div className="absolute left-1/2 top-1/2 max-h-[48px] max-w-[50%] -translate-x-1/2 -translate-y-1/2 text-16 font-bold text-[#101010]">
        {pageName}
      </div>
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isHomePage = pathname === '/';

  const onClickPrevButton = () => navigate(-1);

  const pageName = useMemo(() => {
    const pageTitles: Record<string, string> = {
      '/login': '로그인',
      '/my-course': '내 코스',
      '/ai-recommend': 'AI 추천',
      '/community': '커뮤니티',
      '/my-page': '마이페이지',
      '/culture': '큐레이션',
      '/culture/popups': '큐레이션',
      '/culture/exhibitions': '큐레이션',
    };

    if (pathname.startsWith('/my-course/') && id) {
      return '코스 상세';
    }
    if (pathname.startsWith('/place/') && id) {
      return '장소 상세';
    }

    return pageTitles[pathname] ?? '';
  }, [pathname, id]);

  return (
    <header className={cn(headerVariants({ isHomePage }))}>
      {isHomePage ? (
        <HomeHeader />
      ) : (
        <PageHeader pageName={pageName} onClickPrevButton={onClickPrevButton} />
      )}
    </header>
  );
}
