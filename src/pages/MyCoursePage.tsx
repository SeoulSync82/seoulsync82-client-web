import { TabButton } from '@/components/Button';
import CourseListItem, { CourseListItemProps } from '@/components/pages/course/CourseListItem';
import withAuthGuard from '@/components/WithAuthGuard';

import {
  useBookmarkedCourseList,
  useCourseRecommendHistory,
} from '@/service/course/useCourseService';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const MyCoursePage = () => {
  const tabItems = [
    {
      label: '좋아요 한 코스',
      type: 'liked',
    },
    {
      label: '추천 받은 코스',
      type: 'recommended',
    },
  ];
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const type = searchParams.get('type');
  const navigate = useNavigate();

  useEffect(() => {
    if (!type) {
      searchParams.set('type', 'liked');
      navigate({
        pathname,
        search: `?${searchParams.toString()}`,
      });
    }
  }, [type]);

  const { data: bookmarkedCourseData } = useBookmarkedCourseList({ enabled: type === 'liked' });
  const { data: courseHistoryData } = useCourseRecommendHistory({
    enabled: type === 'recommended',
  });
  const courseList =
    type === 'liked' ? bookmarkedCourseData?.data.items : courseHistoryData?.data.items;

  return (
    <div className="page w-full">
      <div className="flex w-full">
        {tabItems.map((item, idx) => (
          <TabButton
            key={`tab-${idx}`}
            active={search.split('=')[1] === item.type}
            onClick={() => {
              navigate(`${pathname}?type=${item.type}`);
            }}
            className={clsx('flex-1')}
          >
            {item.label}
          </TabButton>
        ))}
      </div>
      <div className="h-[calc(100dvh-192px)] w-full overflow-y-scroll">
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
