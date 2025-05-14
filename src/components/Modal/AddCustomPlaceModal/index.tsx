import { Modal } from '..';
import SvgIcon from '@/components/SvgIcon';
import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useAddCustomPlace, useCheckUsedCustomPlaces } from '@/service/course/useCourseService';
import { ModalProps } from '../Modal';
import useCourseStore from '@/stores/courseSlice';
import { useToast } from '@/context/ToastContext';

export type PlaceType = 'RESTAURANT' | 'CAFE' | 'BAR' | 'SHOPPING' | 'CULTURE' | 'ENTERTAINMENT';
export type PlaceTypeItem = {
  label: string;
  type: string;
  position: string;
};

const placeTypes: PlaceTypeItem[] = [
  { label: '식당', type: 'Restaurant', position: 'bottom-[7%] left-[4%]' },
  { label: '카페', type: 'Cafe', position: 'bottom-[38%] left-[13%]' },
  { label: '술집', type: 'Bar', position: 'bottom-[59%] left-[30%]' },
  { label: '쇼핑', type: 'Shopping', position: 'bottom-[59%] right-[30%]' },
  { label: '문화', type: 'Culture', position: 'bottom-[38%] right-[13%]' },
  { label: '놀거리', type: 'Entertainment', position: 'bottom-[7%] right-[4%]' },
];

export interface AddCustomPlaceModalProps extends ModalProps {}

export default function AddCustomPlaceModal(props: AddCustomPlaceModalProps) {
  const { isOpen: isModalOpen, onClose: onCloseModal, ...rest } = props;

  const [selectedPlaceType, setSelectedPlaceType] = useState('');

  const { toasts, showToast } = useToast();

  const customCourseData = useCourseStore((state) => state.customCourseData);
  const setCustomCourseData = useCourseStore((state) => state.setCustomCourseData);

  const {
    data: addPlaceResponse,
    isFetching: isAddingPlace,
    isSuccess,
  } = useAddCustomPlace(
    {
      place_type: selectedPlaceType.toUpperCase(),
      place_uuids: customCourseData.courseData.places?.map((p) => p.uuid).join(','),
      station_uuid: customCourseData.subwayData.stationUuid,
      theme_uuid: customCourseData.subwayData.themeUuid,
    },
    {
      enabled: !!selectedPlaceType && !isModalOpen,
    },
  );

  // 사용된 장소 체크
  const { isFetching: isCheckingUsedPlaces, data: checkUsedPlacesResponse } =
    useCheckUsedCustomPlaces(
      {
        place_type: selectedPlaceType.toUpperCase(),
        place_uuids: customCourseData.courseData.places?.map((p) => p.uuid).join(','),
        station_uuid: customCourseData.subwayData.stationUuid,
        line_uuid: customCourseData.subwayData.lineUuid,
        theme_uuid: customCourseData.subwayData.themeUuid,
      },
      {
        enabled: isModalOpen,
      },
    );

  const onClickPlaceTypeButton = (type: string) => {
    setSelectedPlaceType(type);
    console.log(111, customCourseData.courseData.places);
  };

  const onClickAiButton = () => {
    onCloseModal();
    console.log(222, customCourseData.courseData.places);
  };

  // 쿼리 응답이 도착할 때(isSuccess), 새 장소를 전역 상태에 추가 (이미 있는 uuid면 중복 추가 X)
  useEffect(() => {
    if (!isSuccess || !addPlaceResponse) return;

    const newPlace = addPlaceResponse.data;

    if (!newPlace?.uuid) {
      alert('해당 타입에 적합한 장소가 더 이상 없습니다.');
      return;
    }

    // 중복 여부 체크 - 이미 places에 있는 uuid면 추가 X
    const alreadyExists = customCourseData.courseData.places.some((p) => p.uuid === newPlace.uuid);
    if (alreadyExists) {
      setSelectedPlaceType(''); // selectedPlaceType을 초기화 - 쿼리 재실행 방지
      return;
    }

    setCustomCourseData({
      courseData: {
        ...customCourseData.courseData,
        places: [...customCourseData.courseData.places, newPlace],
      },
    });

    // 같은 타입 연속으로 클릭시 같은 곳 데이터 응답하는 현상 방지
    setSelectedPlaceType('');
  }, [isSuccess, addPlaceResponse, customCourseData, setCustomCourseData, toasts, showToast]);

  console.log(777, checkUsedPlacesResponse?.data.items);
  console.log(888, typeof checkUsedPlacesResponse?.data.items['CAFE']);

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal} {...rest}>
      <div className="max-container custom-clip-path absolute bottom-0 left-0 right-0 flex h-[252px] w-full flex-col justify-center bg-white p-5 shadow-md">
        {placeTypes.map(({ label, type, position }) => (
          <PlaceTypeButton
            key={type}
            label={label}
            type={type}
            position={position}
            isSelected={selectedPlaceType === type}
            isIconActive={checkUsedPlacesResponse?.data.items[type.toUpperCase()] > 0}
            onClick={() => onClickPlaceTypeButton(type)}
          />
        ))}
        <SvgIcon
          name="AiRecommend"
          width={126}
          height={126}
          className="absolute bottom-[4px] left-1/2 flex -translate-x-1/2 flex-col items-center"
          onClick={onClickAiButton}
        />
      </div>
    </Modal>
  );
}

const PlaceTypeButton = ({
  label,
  type,
  position,
  isSelected = false,
  isIconActive = true,
  onClick,
}: {
  label: string;
  type: string;
  position: string;
  isSelected?: boolean;
  isIconActive?: boolean;
  onClick?: () => void;
}) => {
  const placeTypeButtonVariants = cva(
    'absolute flex size-[70px] flex-col items-center justify-center text-xs font-normal',
    {
      variants: {
        isSelected: { true: 'rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.1)]' },
      },
      defaultVariants: {
        isSelected: false,
      },
    },
  );

  console.log(999, isIconActive);

  return (
    <div className={clsx(placeTypeButtonVariants({ isSelected }), position)} onClick={onClick}>
      <SvgIcon name={type} width={35} height={35} color={isIconActive ? '#9070CF' : '#D9D9D9'} />
      <span className={clsx('mt-2 text-xs', isIconActive ? 'text-primary-500' : 'text-gray-400')}>
        {label}
      </span>
    </div>
  );
};
