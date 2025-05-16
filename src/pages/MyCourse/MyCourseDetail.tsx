import { useEffect, useRef } from 'react';
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
          <PlaceListSection places={detailData?.places || []} />
        </div>
      </div>
    </div>
  );
};

export default withAuthGuard(CourseDetailPage);

const CourseDetailInfo = ({ data }: { data: any }) => {
  if (!data) return null;

  const { line = [], course_name = '', score = '0.0' } = data;
  const [stationName, courseName] = course_name.split(',');

  return (
    <div className="bg-white px-5 py-4">
      <LineTags line={line} />
      <CourseName stationName={stationName} courseName={courseName} />
      <CourseScore score={score} />
      <ActionButtons />
    </div>
  );
};

const LineTags = ({ line }: { line: any[] }) => (
  <div className="flex items-center gap-[4px]">
    {line.map(({ line: lineName, uuid }) => (
      <div
        className="flex h-6 items-center rounded-[50px] border-[1px] border-[#E0D1FF] px-[8px] text-12 font-semibold text-primary-500"
        key={uuid}
      >
        {lineName}
      </div>
    ))}
  </div>
);

const CourseName = ({ stationName, courseName }: { stationName: string; courseName: string }) => (
  <div className="mt-3 h-full">
    <div className="text-16">
      {stationName && <span className="font-bold">{stationName}</span>}
      {courseName && <span className="font-medium">,{courseName}</span>}
    </div>
  </div>
);

const CourseScore = ({ score }: { score: string }) => (
  <div className="mt-1 flex h-4 items-center gap-1">
    <SvgIcon name="FullStar" width={16} height={16} color="#FFC01D" />
    <span className="flex items-center justify-center pt-1 text-sm font-semibold leading-4 text-gray-900">
      {score}
    </span>
    <span className="pt-1 text-sm font-normal leading-4 text-gray-400">(0)</span>
  </div>
);

const ActionButtons = () => (
  <div className="mt-4 flex h-20 items-center justify-center rounded-md border-[1px] border-[#F4F4F4] text-sm text-gray-400">
    {['Bookmark', 'Heart', 'Write'].map((icon, index) => (
      <button
        key={icon}
        className={`h-13 flex w-1/3 flex-col items-center justify-between gap-2 ${
          index < 2 ? 'border-r-[1px] border-[#F4F4F4]' : ''
        }`}
      >
        <SvgIcon name={icon} width={24} height={24} />
        <span className="text-sm text-gray-400">{icon === 'Bookmark' ? '북마크' : '좋아요'}</span>
      </button>
    ))}
  </div>
);

const PlaceListSection = ({ places }: { places: any[] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio === 0.1) {
          console.log('isIntersecting');
          // fetchNextPage();
        }
      });
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white px-5 py-4">
      {places.map((place, idx) => (
        <CustomPlaceItem key={place.uuid} place={place} idx={idx} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
