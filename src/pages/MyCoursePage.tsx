import { TabButton } from '@/components/Button';
import CourseListItem, { CourseListItemProps } from '@/components/pages/course/CourseListItem';
import withAuthGuard from '@/hoc/withAuthGuard';

import {
  useBookmarkedCourseList,
  useCourseRecommendHistory,
} from '@/service/course/useCourseService';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const tabItems = [
  { label: '북마크', type: 'liked' },
  { label: '코스 추천 내역', type: 'recommended' },
];

const MyCoursePage = () => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const type = searchParams.get('type') || 'liked';
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('type')) {
      searchParams.set('type', 'liked');
      navigate({ pathname, search: `?${searchParams.toString()}` });
    }
  }, [type, navigate, pathname, searchParams]);

  const { data: bookmarkedCourseData } = useBookmarkedCourseList({ enabled: type === 'liked' });
  const { data: courseHistoryData } = useCourseRecommendHistory({
    enabled: type === 'recommended',
  });
  const courseList =
    type === 'liked' ? bookmarkedCourseData?.data.items : courseHistoryData?.data.items;

  const handleTabClick = (itemType: string) => {
    navigate(`${pathname}?type=${itemType}`);
  };

  return (
    <div className="page w-full">
      <div className="flex w-full">
        {tabItems.map((item) => (
          <TabButton
            key={item.type}
            active={type === item.type}
            onClick={() => handleTabClick(item.type)}
            className={clsx('flex-1')}
          >
            {item.label}
          </TabButton>
        ))}
      </div>
      <div className="hide-scroll h-[calc(100dvh-192px)] w-full overflow-y-scroll">
        <div className="overflow-y-hidden">
          {courseList?.map((item: CourseListItemProps & { [key: string]: any }) => (
            <CourseListItem key={item.course_uuid} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuthGuard(MyCoursePage);
