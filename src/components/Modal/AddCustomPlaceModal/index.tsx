import { Modal } from '..';
import SvgIcon from '@/components/SvgIcon';
import { useAppStore } from '@/stores';
import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useAddCustomPlace, useCheckUsedCustomPlaces } from '@/service/course/useCourseService';
import { ModalProps } from '../Modal';

export type PlaceType = 'Restaurant' | 'Cafe' | 'Bar' | 'Shopping' | 'Culture' | 'Entertainment';
export type PlaceTypeItem = {
  label: string;
  type: PlaceType;
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
  const { onClose, ...rest } = props;

  const [selectedPlaceType, setSelectedPlaceType] = useState('');

  const customCourseData = useAppStore((state) => state.customCourseData);
  const setCustomCourseData = useAppStore((state) => state.setCustomCourseData);

  const {
    data: addPlaceResponse,
    isFetching: isAddingPlace,
    isSuccess,
  } = useAddCustomPlace(
    {
      place_type: selectedPlaceType.toUpperCase(),
      place_uuids: customCourseData.placeList?.map((p) => p.uuid).join(','),
      station_uuid: customCourseData.stationUuid,
      theme_uuid: customCourseData.themeUuid,
    },
    {
      enabled: !!selectedPlaceType,
    },
  );

  // 사용된 장소 체크
  const { refetch: refetchCheckUsedPlaces, isFetching: isCheckingUsedPlaces } =
    useCheckUsedCustomPlaces(
      {
        place_type: selectedPlaceType.toUpperCase(),
        place_uuids: customCourseData.placeList?.map((p) => p.uuid).join(','),
        station_uuid: customCourseData.stationUuid,
        line_uuid: customCourseData.lineUuid,
        theme_uuid: customCourseData.themeUuid,
      },
      {
        enabled: false,
      },
    );

  const handleSelectPlaceType = (type: string) => {
    setSelectedPlaceType(type);
    onClose();
  };

  // 쿼리 응답이 도착할 때(isSuccess), 새 장소를 전역 상태에 추가 (이미 있는 uuid면 중복 추가 X)
  useEffect(() => {
    if (!isSuccess || !addPlaceResponse) return;

    const newPlace = addPlaceResponse.data;
    if (!newPlace?.uuid) {
      alert('해당 타입에 적합한 장소가 더 이상 없습니다.');
      return;
    }

    // 중복 여부 체크 - 이미 placeList에 있는 uuid면 추가 X
    const alreadyExists = customCourseData.placeList.some((p) => p.uuid === newPlace.uuid);
    if (alreadyExists) {
      setSelectedPlaceType(''); // selectedPlaceType을 초기화 - 쿼리 재실행 방지
      return;
    }

    setCustomCourseData({
      ...customCourseData,
      placeList: [...customCourseData.placeList, newPlace],
    });

    // 같은 타입 연속으로 클릭시 같은 곳 데이터 응답하는 현상 방지
    setSelectedPlaceType('');
  }, [isSuccess, addPlaceResponse]);

  return (
    <Modal onClose={onClose} {...rest}>
      <div className="max-container custom-clip-path absolute bottom-0 left-0 right-0 flex h-[252px] w-full flex-col justify-center bg-white p-5 shadow-md">
        {placeTypes.map(({ label, type, position }) => (
          <PlaceTypeButton
            key={type}
            label={label}
            type={type}
            position={position}
            isSelected={selectedPlaceType === type}
            isIconActive={!isAddingPlace && !isCheckingUsedPlaces}
            onClick={() => handleSelectPlaceType(type)}
          />
        ))}
        <SvgIcon
          name="AiRecommend"
          width={126}
          height={126}
          className="absolute bottom-[4px] left-1/2 flex -translate-x-1/2 flex-col items-center"
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
    'absolute flex size-[71px] flex-col items-center justify-center text-12 font-normal',
    {
      variants: {
        isSelected: { true: 'rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.1)]' },
      },
      defaultVariants: {
        isSelected: false,
      },
    },
  );

  return (
    <div className={clsx(placeTypeButtonVariants({ isSelected }), position)} onClick={onClick}>
      <SvgIcon name={type} width={35} height={35} active={isIconActive} />
      <span className={clsx('mt-[8px]', isIconActive ? 'text-primary-500' : 'text-gray-400')}>
        {label}
      </span>
    </div>
  );
};
