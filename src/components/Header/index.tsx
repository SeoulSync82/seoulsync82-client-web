import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import HomeHeader from './HomeHeader';
import DefaultHeader from './DefaultHeader';
import { headerVariants } from './variants';
import useUserStore from '@/stores/userSlice';
import { cn } from '@/utils/tailwindcss';
import { useEditProfile } from '@/pages/MyPage/EditProfile';
import SvgIcon from '../SvgIcon';
import { useToast } from '@/context/ToastContext';

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

const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { userProfile, userNameValidation } = useUserStore();
  const { handleEditProfile } = useEditProfile();
  const { showToast } = useToast();

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'Seoulsync',
      text: 'Seoulsync 링크를 공유합니다.',
      url: window.location.href,
    };

    try {
      if (isMobileDevice() && navigator.share) {
        await navigator.share(shareData);
        showToast('공유에 성공했습니다.');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('링크가 복사되었습니다.');
      }
    } catch (error) {
      showToast(isMobileDevice() ? '공유에 실패했습니다.' : '링크 복사에 실패했습니다.');
    }
  }, [showToast]);

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
      rightActions: (
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
      rightActions: <SvgIcon name="Share" width={24} height={24} onClick={handleShare} />,
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
    {
      match: (p) => p.startsWith('/review'),
      pageName: '커뮤니티 글쓰기',
      Component: DefaultHeader,
      rightActions: <SvgIcon name="Share" width={24} height={24} onClick={handleShare} />,
    },
    {
      match: (p) => p.startsWith('/comment'),
      pageName: '한줄평 작성',
      Component: DefaultHeader,
      rightActions: <SvgIcon name="Share" width={24} height={24} onClick={handleShare} />,
    },
    {
      match: () => true,
      pageName: '',
      Component: DefaultHeader,
    },
  ];

  const { Component, pageName, rightActions } = headerConfig.find((c) => c.match(pathname))!;

  return (
    <header className={headerVariants({ isHomePage: pathname === '/' })}>
      <Component pageName={pageName as string} rightActions={rightActions} />
    </header>
  );
};

export default Header;
