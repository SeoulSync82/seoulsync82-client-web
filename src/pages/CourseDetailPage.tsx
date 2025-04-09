import React, { useState } from 'react';
import { useParams } from 'react-router';
import withAuthGuard from '@/hoc/withAuthGuard';

import NaverMap from '@/components/Map';
import SvgIcon from '@/components/SvgIcon';
import { useCourseDetail } from '@/service/course/useCourseService';
import CustomPlaceItem from '@/components/pages/ai-recommend/custom-course-step/CustomPlaceItem';

const MAX_MAP_HEIGHT = 224;
const MIN_MAP_HEIGHT = 40;

const getClampedValue = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(value, max));
};

const CourseDetailPage = () => {
  const { id } = useParams();
  const { data } = useCourseDetail(id as string);

  const [mapHeight, setMapHeight] = useState(MAX_MAP_HEIGHT);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollY = e.currentTarget.scrollTop;
    const newHeight = getClampedValue(MAX_MAP_HEIGHT - scrollY, MIN_MAP_HEIGHT, MAX_MAP_HEIGHT);
    setMapHeight(newHeight);
  };

  const detailData = data?.data;
  const points = detailData?.places
    ?.map((point: { latitude: number; longitude: number }) => ({
      lat: point.latitude,
      lng: point.longitude,
    }))
    .sort((a: any, b: any) => a.lat - b.lat);

  return (
    <div className="page flex h-screen flex-col bg-gray-100">
      <NaverMap points={points} height={mapHeight} zoom={13} />
      <div
        onScroll={handleScroll}
        className="hide-scroll w-full flex-1 overflow-y-scroll rounded-t-[8px] bg-gray-50"
      >
        <CourseDetailInfo data={detailData} />
        <PlaceListSection places={detailData?.places || []} />
      </div>
    </div>
  );
};

export default withAuthGuard(CourseDetailPage);

const CourseDetailInfo = ({ data }: { data: any }) => {
  if (!data) return null;

  const { line = [], course_name = '' } = data;
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
        <div className="text-16">
          {stationName && <span className="font-bold">{stationName}</span>}
          {courseName && <span className="font-medium">,{courseName}</span>}
        </div>
        <div className="mt-1 flex h-4 items-center gap-1">
          <SvgIcon name="FullStar" width={16} height={16} color="#FFC01D" />
          <span className="flex items-center justify-center pt-1 text-14 font-semibold leading-4 text-gray-900">
            4.2
          </span>
          <span className="pt-1 text-14 font-normal leading-4 text-gray-400">(999+)</span>
        </div>
        <div className="mt-4 flex h-20 items-center justify-center rounded-md border-[1px] border-[#F4F4F4] px-9 text-14 text-gray-400">
          <button className="h-13 flex w-1/3 flex-col items-center justify-between gap-2 border-r-[1px] border-[#F4F4F4]">
            <SvgIcon name="Bookmark" width={24} height={24} />
            <span className="text-14 text-gray-400">북마크</span>
          </button>
          <button className="h-13 flex w-1/3 flex-col items-center justify-between gap-2 border-r-[1px] border-[#F4F4F4]">
            <SvgIcon name="Heart" width={24} height={24} />
            <span className="text-14 text-gray-400">좋아요</span>
          </button>
          <button className="h-13 flex w-1/3 flex-col items-center justify-between gap-2">
            <SvgIcon name="Write" width={24} height={24} />
            <span className="text-14 text-gray-400">좋아요</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PlaceListSection = ({ places }: { places: any[] }) => {
  return (
    <div className="bg-white px-5 py-4">
      {places.map((place: any, idx: number) => (
        <CustomPlaceItem key={place.uuid} place={place} idx={idx} />
      ))}
    </div>
  );
};
