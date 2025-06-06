import { useParams } from 'react-router';
import withAuthGuard from '@/hoc/withAuthGuard';

import NaverMap from '@/components/NaverMap';
import SvgIcon from '@/components/SvgIcon';
import {
  useCourseDetail,
  useAddCourseBookmark,
  useCancelCourseBookmark,
} from '@/service/course/useCourseService';
import CustomPlaceItem from '@/components/pages/ai-recommend/custom-course-step/CustomPlaceItem';
import { useNavigate, useSearchParams } from 'react-router';
import useCourseStore from '@/stores/courseSlice';
import {
  useAddCommunityPostLike,
  useCancelCommunityPostLike,
  useCommunityPostDetail,
} from '@/service/community/useCommunityService';

const CourseDetailPage = () => {
  const { type: pageType, id: courseUuid } = useParams();

  const [searchParams] = useSearchParams();
  const community_post_uuid = searchParams.get('community_post_uuid');

  const navigate = useNavigate();

  const isCommunityPage = pageType === 'community';

  const { data: courseDetailData } = useCourseDetail(courseUuid as string, {
    enabled: !isCommunityPage,
  });
  const { data: communityPostDetailData } = useCommunityPostDetail(courseUuid as string, {
    enabled: isCommunityPage,
  });

  const detailData = isCommunityPage ? communityPostDetailData : courseDetailData;

  const {
    line = [],
    course_name = '',
    score = '0.0',
    places = [],
    course_uuid,
  } = detailData?.data || {};
  const [stationName, courseName] = course_name.split(',');

  const setCustomCourseData = useCourseStore((state) => state.setCustomCourseData);

  const mapPoints = places
    ?.map(({ latitude, longitude }: { latitude: number; longitude: number }) => ({
      lat: latitude,
      lng: longitude,
    }))
    .sort((a: { lat: number }, b: { lat: number }) => a.lat - b.lat);

  const { mutate: addCourseBookmark } = useAddCourseBookmark();
  const { mutate: cancelCourseBookmark } = useCancelCourseBookmark();

  const { mutate: addCourseLike } = useAddCommunityPostLike();
  const { mutate: cancelCourseLike } = useCancelCommunityPostLike();

  const handleLike = () => {
    if (detailData?.data?.is_liked) {
      cancelCourseLike(courseUuid as string);
    } else {
      addCourseLike(courseUuid as string);
    }
  };

  const handleBookmark = () => {
    if (detailData?.data?.is_bookmarked) {
      cancelCourseBookmark(course_uuid || (courseUuid as string));
    } else {
      addCourseBookmark(course_uuid || (courseUuid as string));
    }
  };

  const handleReset = () => {
    const { line, subway, theme } = courseDetailData?.data || {};

    // TODO: api 데이터 오류 개선 요청 (line uuid, station uuid가 동일한 이슈)
    setCustomCourseData({
      subwayData: {
        lineUuid: line?.[0]?.uuid,
        stationUuid: subway?.uuid,
        themeUuid: theme?.uuid,
      },
    });

    navigate(`/ai-recommend`);
  };

  const handleWrite = () => {
    const { course_uuid, course_name, created_at, customs, is_posted, uuid } =
      detailData?.data || {};

    const path =
      isCommunityPage || is_posted
        ? `/comment?community_post_uuid=${community_post_uuid || uuid}`
        : `/review?course_uuid=${course_uuid}`;
    const state = !isCommunityPage && !is_posted ? { course_name, created_at, customs } : undefined;

    navigate(path, { state });
  };

  const actionButtons: { label: string; icon: string; isActive?: boolean; onClick: () => void }[] =
    [
      {
        label: '북마크',
        icon: 'Bookmark',
        isActive: detailData?.data?.is_bookmarked,
        onClick: handleBookmark,
      },
      isCommunityPage || !!community_post_uuid
        ? {
            label: '좋아요',
            icon: 'Heart',
            isActive: detailData?.data?.is_liked,
            onClick: handleLike,
          }
        : {
            label: '재추천',
            icon: 'Reset',
            onClick: handleReset,
          },
      {
        label: isCommunityPage ? '한줄평' : detailData?.data?.is_posted ? '한줄평' : '글쓰기',
        icon: 'Write',
        onClick: handleWrite,
      },
    ];

  return (
    <div className="page flex flex-col">
      <div className="w-full flex-1 overflow-y-auto ">
        <NaverMap points={mapPoints} height={198} zoom={14} />
        <div className="flex-1 rounded-t-lg bg-gray-50">
          <div className="bg-white px-5 py-4">
            <div className="flex items-center gap-1">
              {line.map(({ line: lineName, uuid }: { line: string; uuid: string }) => (
                <div
                  className="flex h-6 items-center rounded-[50px] border-[1px] border-[#E0D1FF] px-[8px] text-12 font-semibold text-primary-500"
                  key={uuid}
                >
                  {lineName}
                </div>
              ))}
            </div>
            <div className="mt-3 h-full">
              {stationName && <span className="text-base font-bold">{stationName}</span>}
              {courseName && <span className="text-base font-medium">,{courseName}</span>}
            </div>
            {(isCommunityPage || detailData?.data?.is_posted) && (
              <div className="mt-1 flex h-4 items-center gap-1">
                <SvgIcon name="FullStar" width={16} height={16} color="#FFC01D" />
                <span className="flex items-center justify-center pt-1 text-sm font-semibold leading-4 text-gray-900">
                  {score}
                </span>
                <span className="pt-1 text-sm font-normal leading-4 text-gray-400">(0)</span>
              </div>
            )}
            <div className="mt-2 truncate text-12 font-medium text-[#6D757D]">
              {detailData?.data?.customs
                .split(', ')
                .map((v: string) => `#${v}`)
                .join(' ')}
            </div>
            <div className="mt-4 flex h-20 items-center justify-center rounded-md border-[1px] border-[#F4F4F4] text-sm text-gray-400">
              {actionButtons.map(({ label, icon, isActive, onClick }, index) => (
                <button
                  key={icon}
                  className={`h-13 flex w-1/3 flex-col items-center justify-between gap-2 ${
                    index < 2 ? 'border-r-[1px] border-[#F4F4F4]' : ''
                  }`}
                >
                  <SvgIcon name={icon} width={24} height={24} active={isActive} onClick={onClick} />
                  <span className="text-sm text-gray-400">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white px-5 py-4">
            {places.map((place: any, idx: number) => (
              <CustomPlaceItem key={place.uuid} place={place} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthGuard(CourseDetailPage);
