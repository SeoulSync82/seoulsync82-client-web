import SVGIcon from '@/components/svg-icon/SVGIcon';
import { useBoundStore } from '@/stores';
import ModalOuter from '../ModalOuter';
import { useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useSubwayStationCustomCount } from '@/service/subway/useSubwayService';

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

export default function AddCustomPlaceModal({ onClose }: { onClose: () => void }) {
  const [selectedPlaceType, selectPlaceType] = useState('');
  const { lineUuid, stationUuid, customPlaceList, setCustomPlaceType } = useBoundStore();

  const { data: checkCustomPlaceCount } = useSubwayStationCustomCount({
    line_uuid: lineUuid as string,
    station_uuid: stationUuid as string,
    place_uuids: customPlaceList?.map((place: any) => place.uuid).join(','),
  });
  const checkHasPlaceType = (placeType: string) => {
    return checkCustomPlaceCount?.data?.items?.[placeType.toUpperCase()] > 0;
  };
  const onClickPlaceTypeButton = (placeType: string) => {
    const hasPlaceType = checkHasPlaceType(placeType);
    if (!hasPlaceType) {
      alert('toast: 앗.. 해당 장소에 적합한 곳이 없어요.');
      return;
    }
    selectPlaceType(placeType);
  };
  const onSelectCustomPlaceType = () => {
    setCustomPlaceType(selectedPlaceType);
    onClose();
  };

  return (
    <ModalOuter close={onClose}>
      <div className="custom-clip-path absolute bottom-0 flex h-[252px] w-full flex-col justify-center bg-white p-5 shadow-md">
        {placeTypes.map(({ label, type, position }) => (
          <PlaceTypeButton
            key={type}
            label={label}
            type={type}
            position={position}
            isSelected={selectedPlaceType === type}
            isIconActive={checkCustomPlaceCount?.data?.items?.[type.toUpperCase()]}
            onClick={() => onClickPlaceTypeButton(type)}
          />
        ))}
        <SVGIcon
          onClick={onSelectCustomPlaceType}
          name="AiRecommend"
          width={126}
          height={126}
          className="absolute bottom-[4px] left-1/2 flex -translate-x-1/2 flex-col items-center"
        />
      </div>
    </ModalOuter>
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
  onClick?: (place: any) => void;
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
    // TODO: Button 컴포넌트 확장 적용
    <div className={clsx(placeTypeButtonVariants({ isSelected }), position)} onClick={onClick}>
      <SVGIcon name={type} width={35} height={35} active={isIconActive} />
      <span className={clsx('mt-[8px]', isIconActive ? 'text-primary-500' : 'text-gray-400')}>
        {label}
      </span>
    </div>
  );
};
