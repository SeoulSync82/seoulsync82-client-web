import React, { Suspense, useEffect } from 'react';
import { useAppStore } from '@/stores';
import useModal from '@/hooks/useModal';
import CustomPlaceItem from './CustomPlaceItem';
import AddPlaceButton from './AddPlaceButton';
import Loading from '@/components/Loading';

const AddPlaceModal = React.lazy(() => import('@/components/Modal/AddCustomPlaceModal'));

interface CustomCourseStepProps {
  data?: {
    aiRecommendCourseData?: any;
  };
}

const CustomCourseStep = ({ data }: CustomCourseStepProps) => {
  const customCourseData = useAppStore((state) => state.customCourseData);
  const setCustomCourseData = useAppStore((state) => state.setCustomCourseData);

  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!data?.aiRecommendCourseData) return;

    // 이미 동일한 코스 uuid이면 종료 (무한루프 방지)
    if (customCourseData.courseUuid === data.aiRecommendCourseData.course_uuid) {
      return;
    }

    setCustomCourseData({
      ...customCourseData,
      // lineUuid: data.aiRecommendCourseData.line?.[0]?.uuid ?? '',
      // stationUuid: data.aiRecommendCourseData.subway.uuid ?? '',
      courseUuid: data.aiRecommendCourseData.course_uuid,
      courseName: data.aiRecommendCourseData.course_name,
      placeList: data.aiRecommendCourseData.places ?? [],
    });
  }, [data]);

  const handleDeletePlace = (uuid: string) => {
    const filteredList = customCourseData.placeList.filter((item) => item.uuid !== uuid);
    setCustomCourseData({
      ...customCourseData,
      placeList: filteredList,
    });
  };

  console.log('## customCourseData', customCourseData);

  return (
    <div className="flex w-full overflow-y-hidden">
      <div className="h-full w-full overflow-y-auto bg-white px-5 pb-[60px]">
        <AddPlaceButton onClick={openModal} />
        {customCourseData?.placeList?.map((place) => (
          <CustomPlaceItem key={place?.uuid} place={place} onDelete={handleDeletePlace} />
        ))}
      </div>
      <Suspense fallback={<Loading />}>
        <AddPlaceModal isOpen={isModalOpen} onConfirm={closeModal} onClose={closeModal} />
      </Suspense>
    </div>
  );
};

export default CustomCourseStep;
