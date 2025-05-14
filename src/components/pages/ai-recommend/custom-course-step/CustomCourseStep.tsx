import React, { useEffect, useRef, createRef, useState, useCallback } from 'react';
import useModal from '@/hooks/useModal';
import CustomPlaceItem from './CustomPlaceItem';
import AddPlaceButton from './AddPlaceButton';
import useCourseStore from '@/stores/courseSlice';
import Image from '@/components/Image';
import { Link } from 'react-router-dom';
import SvgIcon from '@/components/SvgIcon';
import { useToast } from '@/context/ToastContext';

const BottomSheetModal = React.lazy(() => import('@/components/Modal/BottomSheetModal'));
const AddPlaceModal = React.lazy(() => import('@/components/Modal/AddCustomPlaceModal'));

export interface CustomCourseStepProps {
  data?: {
    aiRecommendCourseData?: any;
  };
}

const CustomCourseStep = ({ data }: CustomCourseStepProps) => {
  const customCourseData = useCourseStore((state) => state.customCourseData);
  const setCustomCourseData = useCourseStore((state) => state.setCustomCourseData);

  const [placeToDelete, setPlaceToDelete] = useState<any>(null);

  const { showToast } = useToast();
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isBottomSheetModalOpen,
    openModal: openBottomSheetModal,
    closeModal: closeBottomSheetModal,
  } = useModal();

  const placeRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    if (!data?.aiRecommendCourseData) return;
    if (customCourseData.courseData.uuid === data.aiRecommendCourseData.course_uuid) return;

    setCustomCourseData({
      courseData: {
        uuid: data.aiRecommendCourseData.course_uuid,
        name: data.aiRecommendCourseData.course_name,
        places: data.aiRecommendCourseData.places ?? [],
      },
    });
  }, [data, customCourseData.courseData.places, setCustomCourseData]);

  useEffect(() => {
    const currentLength = placeRefs.current.length;
    const requiredLength = customCourseData.courseData.places.length;
    if (currentLength < requiredLength) {
      placeRefs.current = [
        ...placeRefs.current,
        ...Array.from({ length: requiredLength - currentLength }, () =>
          createRef<HTMLDivElement>(),
        ),
      ];
    }
  }, [customCourseData.courseData.places]);

  // useEffect(() => {
  //   if (customCourseData.placeList.length > 4) {
  //     console.log(11111);
  //     showToast('더 이상 추가할 수 없어요. 4개의 장소만 추가가 가능해요.');
  //   }
  // }, [customCourseData.placeList]);

  const handleDeletePlace = useCallback(
    async (uuid: string) => {
      const placeToDelete = customCourseData.courseData.places.find((p: any) => p.uuid === uuid);
      setPlaceToDelete(placeToDelete);
      openBottomSheetModal();
    },
    [customCourseData.courseData.places, openBottomSheetModal],
  );

  const handleConfirmBottomSheetModal = useCallback(async () => {
    const filterredList = customCourseData.courseData.places.filter(
      (p) => p.uuid !== placeToDelete.uuid,
    );
    setCustomCourseData({
      courseData: {
        ...customCourseData.courseData,
        places: filterredList,
      },
    });
    closeBottomSheetModal();
    showToast('장소가 삭제되었어요');
  }, [closeBottomSheetModal, customCourseData, setCustomCourseData, placeToDelete, showToast]);

  return (
    <div className="flex w-full overflow-y-hidden">
      <div className="h-full w-full overflow-y-auto bg-white px-5 pb-[60px]">
        <AddPlaceButton onClick={openModal} />
        {customCourseData.courseData.places.map((place, idx) => (
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
        {placeToDelete && <PlaceItemToDelete placeToDelete={placeToDelete} />}
      </BottomSheetModal>
    </div>
  );
};

export default CustomCourseStep;

const PlaceItemToDelete = ({ placeToDelete }: { placeToDelete: any }) => {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg bg-gray-50 p-4">
      <div className="text-base font-semibold text-gray-900">{placeToDelete.place_name}</div>
      <div className="flex w-full items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <Image
            src={placeToDelete.thumbnail}
            alt={placeToDelete.place_name}
            width={68}
            height={68}
            fallbackWidth={32}
            fallbackHeight={32}
            rounded="lg"
          />
          <div className="flex flex-col gap-2">
            <div className="text-sm font-normal text-gray-500">{placeToDelete.address}</div>
            <Link
              to={`/map?latitude=${placeToDelete.latitude}&longitude=${placeToDelete.longitude}`}
              target="_blank"
              className="text-12 font-bold text-primary-500"
            >
              지도보기
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <SvgIcon name="FullStar" width={14} height={14} />
          <span className="pt-1 text-xs font-bold text-gray-900">{placeToDelete.score}</span>
        </div>
      </div>
    </div>
  );
};
