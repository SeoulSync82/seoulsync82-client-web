import React, { Suspense, useEffect } from 'react';
import { useBoundStore } from '@/stores';
import useModal from '@/hooks/useModal';
import CustomPlaceItem from './CustomPlaceItem';
import AddPlaceButton from './AddPlaceButton';
import { useCheckUsedCustomPlaces } from '@/service/course/useCourseService';
import { useCheckRemainingCustomPlaces } from '@/service/subway/useSubwayService';
import { PlaceItemType } from '@/service/course/types';
import Loading from '@/components/Loading';

const AddCustomPlaceModal = React.lazy(() => import('@/components/Modal/AddCustomPlaceModal'));

interface CustomCourseStepProps {
  data?: {
    aiRecommendCourseData: any;
  };
}

const CustomCourseStep = ({ data }: CustomCourseStepProps) => {
  const customCourseData = useBoundStore((state) => state.customCourseData);
  const setCustomCourseData = useBoundStore((state) => state.setCustomCourseData);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!data?.aiRecommendCourseData) return;
    setCustomCourseData({
      ...customCourseData,
      lineUuid: data?.aiRecommendCourseData?.line_uuid,
      stationUuid: data?.aiRecommendCourseData?.station_uuid,
      themeUuid: data?.aiRecommendCourseData?.theme_uuid,
      courseUuid: data?.aiRecommendCourseData?.course_uuid,
      courseName: data?.aiRecommendCourseData?.course_name,
      placeList: data?.aiRecommendCourseData?.places,
    });
  }, [data, customCourseData]);

  // const { data: checkUsedPlaceResultData } = useCheckUsedCustomPlaces(
  //   {
  //     place_uuids: customCourseData.placeList?.map((place: PlaceItemType) => place?.uuid).join(','),
  //     place_type: customCourseData.placeType.toUpperCase(),
  //     station_uuid: customCourseData.stationUuid,
  //     theme_uuid: customCourseData.themeUuid,
  //   },
  //   {
  //     enabled: !!customCourseData.placeType,
  //   },
  // );

  const { data: checkRemainingPlaceData } = useCheckRemainingCustomPlaces({
    line_uuid: customCourseData.lineUuid as string,
    station_uuid: customCourseData.stationUuid as string,
    place_uuids: customCourseData.placeList?.map((place: any) => place.uuid).join(','),
  });

  const CustomPlaceList = () => {
    const handleDeletePlace = (uuid: string) => {
      const filteredList = customCourseData.placeList.filter(
        (item: PlaceItemType) => item.uuid !== uuid,
      );
      setCustomCourseData({
        ...customCourseData,
        placeList: filteredList,
      });
    };
    return (
      <>
        {customCourseData?.placeList?.map((place: PlaceItemType) => (
          <CustomPlaceItem key={place.uuid} place={place} onDelete={handleDeletePlace} />
        ))}
      </>
    );
  };

  return (
    <div className="flex w-full overflow-y-hidden">
      <div className="mb-19 h-full w-full bg-white px-5">
        <AddPlaceButton onClick={() => openModal()} />
        <CustomPlaceList />
      </div>
      <Suspense fallback={<Loading />}>
        <AddCustomPlaceModal isOpen={isModalOpen} onConfirm={closeModal} onClose={closeModal} />
      </Suspense>
    </div>
  );
};
export default CustomCourseStep;
