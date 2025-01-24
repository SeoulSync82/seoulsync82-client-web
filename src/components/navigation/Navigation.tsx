import SVGIcon from '../svg-icon/SVGIcon';
import { Link, useLocation } from 'react-router-dom';
import { NavbarIcon } from '../button/types';

export default function Navigation() {
  const { pathname } = useLocation();

  type MenuItem = {
    name: string;
    size: number;
    path: string;
  };
  const navbarMenu: Record<NavbarIcon, MenuItem> = {
    Home: { name: '홈', size: 24, path: '/' },
    MyCourse: { name: '내 코스', size: 24, path: '/my-course' },
    AiRecommend: { name: 'AI 추천', size: 66, path: '/ai-recommend' },
    Community: { name: '커뮤니티', size: 24, path: '/community' },
    MyPage: { name: '마이페이지', size: 24, path: '/my-page' },
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex h-[109px] w-full max-w-[430px] items-end transition-all">
      <div className="h-[86px] w-full rounded-t-[20px] bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.08)]">
        <ul className="justify-between] max-container flex h-full items-center">
          {Object.entries(navbarMenu).map(([key, { name, size, path }]: [string, MenuItem]) => (
            <li
              className={`group flex grow cursor-pointer flex-col items-center justify-center ${pathname === key && 'active'}`}
              key={key}
            >
              {key === 'AiRecommend' ? (
                <Link
                  to={path}
                  className="flex min-w-14 max-w-14 flex-col items-center justify-center"
                >
                  <div className="mb-[6px] w-fit">
                    <SVGIcon
                      name={key as NavbarIcon}
                      height={size}
                      width={size}
                      active={pathname === key}
                    />
                  </div>
                  <div className="mb-8 w-fit text-12 font-bold text-[#9070CF]">{name}</div>
                </Link>
              ) : (
                <Link
                  to={path}
                  className="flex min-w-14 max-w-14 flex-col items-center justify-center"
                >
                  <div className="w-fit">
                    <SVGIcon
                      name={key as NavbarIcon}
                      height={size}
                      width={size}
                      active={pathname === key}
                    />
                  </div>
                  <div className="mt-[6px] w-fit text-12 font-bold text-gray-300 group-[&.active]:text-[#353D4A]">
                    {name}
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
