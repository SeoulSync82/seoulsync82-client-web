import TabButtonGroup from '@/components/TabButtonGroup';
import CourseListItem, { CourseListItemProps } from '@/components/pages/course/CourseListItem';
import withAuthGuard from '@/hoc/withAuthGuard';

import {
  useBookmarkedCourseList,
  useCourseRecommendHistory,
} from '@/service/course/useCourseService';
import { useEffect } from 'react';
import { useQueryParams } from '@/hooks/useQueryParams';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const tabItems = [
  { label: '북마크', type: 'liked' },
  { label: '코스 추천 내역', type: 'recommended' },
];

const MyCoursePage = () => {
  const { searchParams, updateQueryParam } = useQueryParams();
  const type = searchParams.get('type') || 'liked';

  // useEffect(() => {
  //   if (!searchParams.get('type')) {
  //     updateQueryParam('type', 'liked');
  //   }
  // }, [type, updateQueryParam, searchParams]);

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
      <CourseList courseList={courseList || []} />
      <div ref={bottomRef} />
    </div>
  );
};

const CourseList = ({
  courseList,
}: {
  courseList: (CourseListItemProps & { [key: string]: any })[];
}) => (
  <div className="hide-scroll h-[calc(100dvh-192px)] w-full overflow-y-scroll">
    <div className="overflow-y-hidden">
      {courseList?.map((item) => <CourseListItem key={item.course_uuid} {...item} />)}
    </div>
  </div>
);

export default withAuthGuard(MyCoursePage);
