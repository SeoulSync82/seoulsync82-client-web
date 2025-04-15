import SVGIcon from '../SvgIcon';
import { Link, useLocation } from 'react-router-dom';
import { NavbarIcon } from './types';
import { listItemVariants, textVariants, iconWrapperVariants } from './variants';

export default function Navigation() {
  const { pathname } = useLocation();

  const navbarMenu: Record<NavbarIcon, { name: string; size: number; path: string }> = {
    Home: { name: '홈', size: 24, path: '/' },
    MyCourse: { name: '내 코스', size: 24, path: '/course' },
    AiRecommend: { name: 'AI 추천', size: 66, path: '/ai-recommend' },
    Community: { name: '커뮤니티', size: 24, path: '/community' },
    MyPage: { name: '마이페이지', size: 24, path: '/my-page' },
  };

  const NavMenuItem = ({ item }: { item: { name: string; size: number; path: string } }) => (
    <li className={listItemVariants({ active: pathname === item.path })}>
      <Link
        to={item.path}
        className="flex min-w-[56px] max-w-[56px] flex-col items-center justify-center"
      >
        <div className={iconWrapperVariants({ isAiRecommend: item.name === 'AiRecommend' })}>
          <SVGIcon
            name={item.name as NavbarIcon}
            height={item.size}
            width={item.size}
            active={pathname === item.path}
          />
        </div>
        <div className={textVariants({ isAiRecommend: item.name === 'AiRecommend' })}>
          {item.name}
        </div>
      </Link>
    </li>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex h-[109px] w-full max-w-[430px] items-end transition-all">
      <div className="h-[86px] w-full rounded-t-[20px] bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.08)]">
        <ul className="flex h-full items-center justify-between">
          {Object.entries(navbarMenu).map(([key, item]) => (
            <NavMenuItem key={key} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
