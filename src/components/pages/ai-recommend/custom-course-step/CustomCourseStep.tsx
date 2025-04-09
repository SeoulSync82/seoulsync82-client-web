import React, { Suspense, useEffect, useRef, createRef, useState, useCallback } from 'react';
import { useAppStore } from '@/stores';
import useModal from '@/hooks/useModal';
import CustomPlaceItem from './CustomPlaceItem';
import AddPlaceButton from './AddPlaceButton';
import Loading from '@/components/Loading';
import { flushSync } from 'react-dom';

const BottomSheetModal = React.lazy(() => import('@/components/Modal/BottomSheetModal'));
const AddPlaceModal = React.lazy(() => import('@/components/Modal/AddCustomPlaceModal'));

interface CustomCourseStepProps {
  data?: {
    aiRecommendCourseData?: any;
  };
}

const CustomCourseStep = ({ data }: CustomCourseStepProps) => {
  const customCourseData = useAppStore((state) => state.customCourseData);
  const setCustomCourseData = useAppStore((state) => state.setCustomCourseData);

  const [bottomSheetChildHTML, setBottomSheetChildHTML] = useState<string>('');
  const [bottomSheetChildUuid, setBottomSheetChildUuid] = useState<string>('');

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
    async (uuid: string, itemRef?: React.RefObject<HTMLDivElement>) => {
      if (itemRef?.current) {
        setBottomSheetChildHTML(itemRef.current.querySelector('#accordion')?.innerHTML ?? '');
      }
      setBottomSheetChildUuid(uuid);
      openBottomSheetModal();
    },
    [openBottomSheetModal],
  );

  const handleConfirmBottomSheetModal = useCallback(async () => {
    flushSync(() => {
      const filteredList = customCourseData.placeList.filter(
        (p) => p.uuid !== bottomSheetChildUuid,
      );
      setCustomCourseData({
        ...customCourseData,
        placeList: filteredList,
      });
    });

    flushSync(() => {
      closeBottomSheetModal();
    });

    alert('장소가 삭제되었어요');
  }, [bottomSheetChildUuid, closeBottomSheetModal, customCourseData, setCustomCourseData]);

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
      <Suspense fallback={<Loading />}>
        <AddPlaceModal isOpen={isModalOpen} onConfirm={closeModal} onClose={closeModal} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <BottomSheetModal
          isOpen={isBottomSheetModalOpen}
          onClose={closeBottomSheetModal}
          onConfirm={handleConfirmBottomSheetModal}
        >
          {bottomSheetChildHTML && (
            <div dangerouslySetInnerHTML={{ __html: bottomSheetChildHTML }} />
          )}
        </BottomSheetModal>
      </Suspense>
    </div>
  );
};

export default CustomCourseStep;
