import SVGIcon from '../SvgIcon';
import { Link, useLocation } from 'react-router-dom';
import { NavbarIcon } from './types';
import { cn } from '@/utils/clsx';
import { cva } from 'class-variance-authority';

const listItemVariants = cva(
  'group flex grow cursor-pointer flex-col items-center justify-center',
  {
    variants: {
      active: {
        true: 'active',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

const textVariants = cva('text-12 font-bold w-fit', {
  variants: {
    isAiRecommend: {
      true: 'mb-8 text-[#9070CF]',
      false: 'mt-[6px] text-gray-300 group-[&.active]:text-[#353D4A]',
    },
  },
  defaultVariants: {
    isAiRecommend: false,
  },
});

const iconWrapperVariants = cva('w-fit', {
  variants: {
    isAiRecommend: {
      true: 'mb-[6px]',
      false: '',
    },
  },
  defaultVariants: {
    isAiRecommend: false,
  },
});

export default function Navigation() {
  const { pathname } = useLocation();

  type MenuItem = {
    name: string;
    size: number;
    path: string;
  };

  const navbarMenu: Record<NavbarIcon, MenuItem> = {
    Home: { name: '홈', size: 24, path: '/' },
    MyCourse: { name: '내 코스', size: 24, path: '/course' },
    AiRecommend: {
      name: 'AI 추천',
      size: 66,
      path: '/ai-recommend?type=subway',
    },
    Community: { name: '커뮤니티', size: 24, path: '/community' },
    MyPage: { name: '마이페이지', size: 24, path: '/my-page' },
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex h-[109px] w-full max-w-[430px] items-end transition-all">
      <div className="h-[86px] w-full rounded-t-[20px] bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.08)]">
        <ul className="flex h-full items-center justify-between">
          {Object.entries(navbarMenu).map(([key, { name, size, path }]: [string, MenuItem]) => (
            <li className={listItemVariants({ active: pathname === path })} key={key}>
              <Link
                to={path}
                className="flex min-w-[56px] max-w-[56px] flex-col items-center justify-center"
              >
                <div className={iconWrapperVariants({ isAiRecommend: key === 'AiRecommend' })}>
                  <SVGIcon
                    name={key as NavbarIcon}
                    height={size}
                    width={size}
                    active={pathname === path}
                  />
                </div>
                <div className={textVariants({ isAiRecommend: key === 'AiRecommend' })}>{name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
