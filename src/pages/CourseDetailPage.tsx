import NaverMap from '@/components/Map';
import { useCourseDetail } from '@/service/course/useCourseService';
import { useParams } from 'react-router';
import withAuthGuard from '@/hoc/withAuthGuard';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { data } = useCourseDetail(id as string);
  return (
    <div className="w-full">
      <NaverMap
        latitude={data?.data?.places?.[0]?.latitude}
        longitude={data?.data?.places?.[0]?.longitude}
        height={198}
      />
      <div className="h-full w-full rounded-t-[8px] bg-white px-[20px] pt-[12px] shadow-[2px_2px_12px_0px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-[4px]">
          {data?.data?.line?.map(({ line, uuid }: { line: string; uuid: string }) => (
            <div
              className="flex h-[20px] items-center rounded-[50px] border-[1px] border-[#E0D1FF] px-[8px] text-10 font-semibold text-primary-500"
              key={uuid}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="mt-[12px] h-full">
          <div className="text-16">
            <span className="font-bold">{data?.data?.course_name.split(',')[0]}</span>
            <span className="font-medium">,{data?.data?.course_name.split(',')[1]}</span>
          </div>
        </div>
        <div>작업중...</div>
      </div>
    </div>
  );
};

export default withAuthGuard(CourseDetailPage);
