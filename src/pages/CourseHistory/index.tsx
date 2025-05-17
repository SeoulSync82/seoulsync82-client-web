import { Button } from '@/components/Button';
import { useCourseRecommendHistory } from '@/service/course/useCourseService';
import { useNavigate } from 'react-router-dom';

const CourseHistory = () => {
  const navigate = useNavigate();
  const { data: courseHistory } = useCourseRecommendHistory();

  const handleSelectCourse = (uuid: number) => {
    const selectedCourse = courseHistory?.find((course) => course.course_uuid === uuid);
    navigate(`/review?course_uuid=${uuid}`, {
      state: {
        course_name: selectedCourse?.course_name,
        customs: selectedCourse?.customs,
        created_at: selectedCourse?.created_at,
      },
    });
  };

  return (
    <div className="page px-5">
      {courseHistory?.map(({ course_uuid, course_name, customs, created_at }, idx) => (
        <div
          key={course_uuid}
          className={`mb-5 flex w-full flex-col gap-2.5 ${idx > 0 ? 'border-t pt-2.5' : ''}`}
        >
          <CourseSummary customs={customs} courseName={course_name} createdAt={created_at} />
          {/* TODO: 버튼 컴포넌트화 */}
          <Button
            fullWidth
            rounded={4}
            height={32}
            fontSize={12}
            fontWeight="semibold"
            textColor="white"
            bgColor="primary"
            onClick={() => handleSelectCourse(course_uuid)}
          >
            선택하기
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CourseHistory;

const CourseSummary = ({ customs, courseName, createdAt }: { customs: string; courseName: string; createdAt: string }) => (
  <div className="flex flex-col gap-1 py-2">
    <div className="flex flex-wrap gap-1">
      {customs
        .split(',')
        .filter((v: string) => v)
        .map((tag: string, idx: number) => (
          <span
            key={`${tag}-${idx}`}
            className="flex h-5 items-center justify-center rounded-full border-[1px] border-[#E0D1FF] px-2 text-10 font-semibold text-primary-500"
          >
            {tag}
          </span>
        ))}
    </div>
    <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
      {courseName}
    </div>
    <div className="text-xs leading-none text-gray-400">추천일자 {createdAt}</div>
  </div>
);
