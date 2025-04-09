import React, { Suspense, useEffect, useRef, createRef, useState } from 'react';
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
  }, [data]);

  useEffect(() => {
    if (placeRefs.current.length < customCourseData.placeList.length) {
      const needed = customCourseData.placeList.length - placeRefs.current.length;
      for (let i = 0; i < needed; i++) {
        placeRefs.current.push(createRef<HTMLDivElement>());
      }
    }
  }, [customCourseData.placeList]);

  const handleDeletePlace = async (uuid: string, itemRef?: React.RefObject<HTMLDivElement>) => {
    console.log('Delete place uuid:', uuid);

    if (itemRef?.current) {
      setBottomSheetChildHTML(itemRef?.current?.querySelector('#accordion')?.innerHTML ?? '');
    }
    setBottomSheetChildUuid(uuid);

    openBottomSheetModal();
  };

  const handleConfirmBottomSheetModal = async () => {
    // flushSync: React가 해당 콜백 안의 상태 변경을 즉시 처리하고 DOM 업데이트를 동기적으로 플러시
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
  };

  return (
    <div className="flex w-full overflow-y-hidden">
      <div className="h-full w-full overflow-y-auto bg-white px-5 pb-[60px]">
        <AddPlaceButton onClick={openModal} />
        {customCourseData.placeList.map((place, idx) => {
          return (
            <CustomPlaceItem
              key={place.uuid}
              place={place}
              idx={idx}
              ref={placeRefs.current[idx]}
              onDelete={(uuid, ref) => handleDeletePlace(uuid, ref)}
            />
          );
        })}
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
          <div dangerouslySetInnerHTML={{ __html: bottomSheetChildHTML }} />
        </BottomSheetModal>
      </Suspense>
    </div>
  );
};

export default CustomCourseStep;
