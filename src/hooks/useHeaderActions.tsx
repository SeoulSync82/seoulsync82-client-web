import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useToast } from '@/context/ToastContext';
import { useCreateCommunityPost } from '@/service/community/useCommunityService';
import useReviewStore from '@/stores/reviewSlice';
import SvgIcon from '@/components/SvgIcon';
import { cn } from '@/utils/tailwindcss';
import { useEditProfile } from '@/pages/MyPage/EditProfile';
import useUserStore from '@/stores/userSlice';

const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const useHeaderActions = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showToast } = useToast();
  const { handleEditProfile } = useEditProfile();

  const userProfile = useUserStore((state) => state.userProfile);
  const userNameValidation = useUserStore((state) => state.userNameValidation);

  const stars = useReviewStore((state) => state.stars);
  const review = useReviewStore((state) => state.review);

  const { mutate: createCommunityPost } = useCreateCommunityPost();

  const handleShareLink = useCallback(async () => {
    const shareData = {
      title: 'Seoulsync82',
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

  const handleCreateCommunityReviewPost = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const courseUuid = searchParams.get('course_uuid');

    createCommunityPost(
      {
        uuid: courseUuid as string,
        score: stars,
        review,
      },
      {
        onSuccess: () => {
          showToast('커뮤니티 글쓰기가 완료되었어요');
          navigate('/community');
        },
        onError: () => {
          showToast('커뮤니티 글쓰기에 실패했어요');
        },
      },
    );
  };

  const actionMap: Record<string, () => React.ReactNode> = {
    '/course': () => (
      <button onClick={handleShareLink}>
        <SvgIcon name="Share" width={24} height={24} />
      </button>
    ),
    '/community': () => (
      <button onClick={handleCreateCommunityReviewPost}>
        <SvgIcon name="Share" width={24} height={24} />
      </button>
    ),
    '/my-page/edit-profile': () => (
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
    '/review': () => (
      <button
        className="text-sm font-bold text-primary-500"
        onClick={handleCreateCommunityReviewPost}
      >
        등록
      </button>
    ),
  };

  const getRightActions = () => {
    const key = Object.keys(actionMap).find((k) => pathname.startsWith(k));
    return key ? actionMap[key]() : null;
  };

  return {
    handleShareLink,
    handleCreateCommunityReviewPost,
    getRightActions,
  };
};

export default useHeaderActions;
