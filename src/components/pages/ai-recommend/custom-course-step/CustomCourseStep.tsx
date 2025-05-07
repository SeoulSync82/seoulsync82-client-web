import React, { useEffect, useRef, createRef, useState, useCallback } from 'react';
import useModal from '@/hooks/useModal';
import CustomPlaceItem from './CustomPlaceItem';
import AddPlaceButton from './AddPlaceButton';
import useCourseStore from '@/stores/courseSlice';

const BottomSheetModal = React.lazy(() => import('@/components/Modal/BottomSheetModal'));
const AddPlaceModal = React.lazy(() => import('@/components/Modal/AddCustomPlaceModal'));

interface CustomCourseStepProps {
  data?: {
    aiRecommendCourseData?: any;
  };
}

const CustomCourseStep = ({ data }: CustomCourseStepProps) => {
  const customCourseData = useCourseStore((state) => state.customCourseData);
  const setCustomCourseData = useCourseStore((state) => state.setCustomCourseData);

  const [placeToDelete, setPlaceToDelete] = useState<any>(null);

  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isBottomSheetModalOpen,
    openModal: openBottomSheetModal,
    closeModal: closeBottomSheetModal,
  } = useModal();

  const placeRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    if (!data?.aiRecommendCourseData) return;
    if (customCourseData.courseUuid === data.aiRecommendCourseData.course_uuid) return;

    setCustomCourseData({
      ...customCourseData,
      courseUuid: data.aiRecommendCourseData.course_uuid,
      courseName: data.aiRecommendCourseData.course_name,
      placeList: data.aiRecommendCourseData.places ?? [],
    });
  }, [data, customCourseData, setCustomCourseData]);

  useEffect(() => {
    const currentLength = placeRefs.current.length;
    const requiredLength = customCourseData.placeList.length;
    if (currentLength < requiredLength) {
      placeRefs.current = [
        ...placeRefs.current,
        ...Array.from({ length: requiredLength - currentLength }, () =>
          createRef<HTMLDivElement>(),
        ),
      ];
    }
  }, [customCourseData.placeList]);

  const handleDeletePlace = useCallback(
    async (uuid: string) => {
      const placeToDelete = data?.aiRecommendCourseData.places.find((p: any) => p.uuid === uuid);
      setPlaceToDelete(placeToDelete);
      openBottomSheetModal();
    },
    [data, setPlaceToDelete, openBottomSheetModal],
  );

  const handleConfirmBottomSheetModal = useCallback(async () => {
    const filterredList = customCourseData.placeList.filter((p) => p.uuid !== placeToDelete.uuid);
    setCustomCourseData({
      ...customCourseData,
      placeList: filterredList,
    });
    closeBottomSheetModal();
    alert('장소가 삭제되었어요'); // TODO: 토스트 메시지 추가
  }, [closeBottomSheetModal, customCourseData, setCustomCourseData, placeToDelete]);

  return (
    <div className="flex w-full overflow-y-hidden">
      <div className="h-full w-full overflow-y-auto bg-white px-5 pb-[60px]">
        <AddPlaceButton onClick={openModal} />
        {customCourseData.placeList.map((place, idx) => (
          <CustomPlaceItem
            key={place.uuid}
            place={place}
            idx={idx}
            ref={placeRefs.current[idx]}
            onDelete={handleDeletePlace}
          />
        ))}
      </div>
      <AddPlaceModal isOpen={isModalOpen} onConfirm={closeModal} onClose={closeModal} />
      <BottomSheetModal
        isOpen={isBottomSheetModalOpen}
        onClose={closeBottomSheetModal}
        onConfirm={handleConfirmBottomSheetModal}
      >
        {placeToDelete && <BottomSheetContent placeToDelete={placeToDelete} />}
      </BottomSheetModal>
    </div>
  );
};

export default CustomCourseStep;

const BottomSheetContent = ({ placeToDelete }: { placeToDelete: any }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="text-14 font-normal text-gray-900">{placeToDelete.place_name}</div>
      <div className="flex w-full gap-2">
        <img
          src={placeToDelete.thumbnail}
          alt={placeToDelete.place_name}
          className="h-[68px] w-[68px] object-cover"
        />
        <div className="flex flex-col gap-2">
          <div className="text-12 font-normal text-gray-500">{placeToDelete.address}</div>
        </div>
      </div>
    </div>
  );
};