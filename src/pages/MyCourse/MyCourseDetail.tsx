import { useParams } from 'react-router';
import withAuthGuard from '@/hoc/withAuthGuard';

import NaverMap from '@/components/NaverMap';
import SvgIcon from '@/components/SvgIcon';
import { useCourseDetail } from '@/service/course/useCourseService';
import CustomPlaceItem from '@/components/pages/ai-recommend/custom-course-step/CustomPlaceItem';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { data } = useCourseDetail(id as string);

  const detailData = data?.data;
  const mapPoints = detailData?.places
    ?.map(({ latitude, longitude }: { latitude: number; longitude: number }) => ({
      lat: latitude,
      lng: longitude,
    }))
    .sort((a: any, b: any) => a.lat - b.lat);

  return (
    <div className="page flex h-screen flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto">
        <NaverMap points={mapPoints} height={198} zoom={14} />
        <div className="w-full flex-1 rounded-t-lg bg-gray-50">
          <CourseDetailInfo data={detailData} />
          <div className="bg-white px-5 py-4">
            {detailData?.places.map((place: any, idx: number) => (
              <CustomPlaceItem key={place.uuid} place={place} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthGuard(CourseDetailPage);

const CourseDetailInfo = ({ data }: { data: any }) => {
  if (!data) return null;

  const ACTION_BUTTONS = [
    { label: '북마크', icon: 'Bookmark' },
    { label: '좋아요', icon: 'Heart' },
    { label: '한줄평', icon: 'Write' },
  ];

  const { line = [], course_name = '', score = '0.0' } = data;
  const [stationName, courseName] = course_name.split(',');

  return (
    <div className="bg-white px-5 py-4">
      <div className="flex items-center gap-[4px]">
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
        <div>
          {stationName && <span className="text-base font-bold">{stationName}</span>}
          {courseName && <span className="text-base font-medium">,{courseName}</span>}
        </div>
      </div>
      <div className="mt-1 flex h-4 items-center gap-1">
        <SvgIcon name="FullStar" width={16} height={16} color="#FFC01D" />
        <span className="flex items-center justify-center pt-1 text-sm font-semibold leading-4 text-gray-900">
          {score}
        </span>
        <span className="pt-1 text-sm font-normal leading-4 text-gray-400">(0)</span>
      </div>{' '}
      <div className="mt-4 flex h-20 items-center justify-center rounded-md border-[1px] border-[#F4F4F4] text-sm text-gray-400">
        {ACTION_BUTTONS.map(({ label, icon }, index) => (
          // TODO: 버튼 컴포넌트화
          <button
            key={icon}
            className={`h-13 flex w-1/3 flex-col items-center justify-between gap-2 ${
              index < 2 ? 'border-r-[1px] border-[#F4F4F4]' : ''
            }`}
          >
            <SvgIcon name={icon} width={24} height={24} />
            <span className="text-sm text-gray-400">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
