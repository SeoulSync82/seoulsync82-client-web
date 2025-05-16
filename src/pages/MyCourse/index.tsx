import TabButtonGroup from '@/components/TabButtonGroup';
import CourseListItem, { CourseListItemProps } from '@/components/pages/course/CourseListItem';
import withAuthGuard from '@/hoc/withAuthGuard';

import {
  useBookmarkedCourseList,
  useCourseRecommendHistory,
} from '@/service/course/useCourseService';
import { useQueryParams } from '@/hooks/useQueryParams';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const tabItems = [
  { label: '북마크', type: 'liked' },
  { label: '코스 추천 내역', type: 'recommended' },
];

const MyCoursePage = () => {
  const { searchParams, updateQueryParam } = useQueryParams();
  const type = searchParams.get('type') || 'liked';

  const {
    data: bookmarkedCourseData,
    hasNextPage: bookmarkedCourseHasNextPage,
    fetchNextPage: fetchBookmarkedCourseNextPage,
  } = useBookmarkedCourseList({ enabled: type === 'liked' });

  const {
    data: courseHistoryData,
    hasNextPage: courseHistoryHasNextPage,
    fetchNextPage: fetchCourseHistoryNextPage,
  } = useCourseRecommendHistory({
    enabled: type === 'recommended',
  });

  const courseList = type === 'liked' ? bookmarkedCourseData : courseHistoryData;
  const hasNextPage = type === 'liked' ? bookmarkedCourseHasNextPage : courseHistoryHasNextPage;
  const fetchNextPage =
    type === 'liked' ? fetchBookmarkedCourseNextPage : fetchCourseHistoryNextPage;

  const { bottomRef } = useIntersectionObserver(hasNextPage, fetchNextPage);

  const handleTabClick = (itemType: string) => {
    updateQueryParam('type', itemType);
  };

  return (
    <div className="page w-full">
      <TabButtonGroup tabType={type} onClickTab={handleTabClick} tabItems={tabItems} />
      <div className="hide-scroll h-[calc(100dvh-192px)] w-full overflow-y-scroll">
        {courseList?.map((item: CourseListItemProps) => (
          <CourseListItem
            key={item.course_uuid}
            isBookmarked={
              type === 'liked'
                ? courseList.some((course) => course.course_uuid === item.course_uuid)
                : undefined
            }
            {...item}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default withAuthGuard(MyCoursePage);
