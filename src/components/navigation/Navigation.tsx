import SVGIcon from '../svg-icon/SVGIcon';
import { Link, useLocation } from 'react-router-dom';
import { IconType } from '../button/types';

export default function Navigation() {
  const { pathname } = useLocation();

  type MenuItem = {
    name: string;
    size: number;
  };
  const menuList: Record<IconType, MenuItem> = {
    Home: { name: '홈', size: 24 },
    MyCourse: { name: '내 코스', size: 24 },
    AiRecommend: { name: 'AI 추천', size: 66 },
    Community: { name: '커뮤니티', size: 24 },
    Profile: { name: '마이페이지', size: 24 },
  };

  return (
    <nav className="fixed bottom-0 left-0 z-50 h-[86px] w-full transition-all">
      <div className="h-[86px] w-full rounded-t-[20px] bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.08)]">
        <ul className="max-container flex h-full items-center justify-between py-2.5">
          {Object.entries(menuList).map(([key, { name, size }]: [string, MenuItem]) => (
            <li
              className={`group flex grow cursor-pointer flex-col items-center justify-center ${pathname === key ? 'active' : ''}`}
              key={key}
            >
              <Link
                to={key}
                className="flex min-w-14 max-w-14 flex-col items-center justify-center"
              >
                <div className="w-fit">
                  <SVGIcon
                    name={key as IconType}
                    width={size}
                    height={size}
                    active={pathname === key}
                    color={pathname === key ? 'primary-800' : 'gray-300'}
                  />
                </div>
                <div className="group-[&.active]:text-primary-800 mt-[6px] w-fit text-[12px] font-bold text-gray-300">
                  {name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
