import SVGIcon from '@/components/svg-icon/SVGIcon';
import { useState } from 'react';
import ModalOuter from '../ModalOuter';

const placeTypes = [
  { label: '식당', type: 'Restaurant', position: 'bottom-[7%] left-[4%]' },
  { label: '카페', type: 'Cafe', position: 'bottom-[38%] left-[13%]' },
  { label: '술집', type: 'Bar', position: 'bottom-[59%] left-[30%]' },
  { label: '쇼핑', type: 'Shopping', position: 'bottom-[59%] right-[30%]' },
  { label: '문화', type: 'Culture', position: 'bottom-[38%] right-[13%]' },
  { label: '놀거리', type: 'Entertainment', position: 'bottom-[7%] right-[4%]' },
];

export default function AddPlaceModal() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const onClickPlaceButton = (placeType: string) => {
    setSelectedType(placeType);
  };
  return (
    <ModalOuter>
      <div className="custom-clip-path absolute bottom-0 left-0 flex h-[252px] w-full flex-col justify-center bg-white p-5 shadow-md">
        {placeTypes.map(({ label, type, position }) => (
          <PlaceButton
            key={type}
            label={label}
            type={type}
            position={position}
            isSelected={selectedType === type}
            isIconActive={selectedType === type}
            onClick={() => onClickPlaceButton(type)}
          />
        ))}
        <div className="absolute bottom-[4px] left-1/2 flex -translate-x-1/2 flex-col items-center">
          <SVGIcon name="AiRecommend" width={126} height={126} />
        </div>
      </div>
    </ModalOuter>
  );
}

const PlaceButton = ({
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
  return (
    <div
      className={`absolute ${position} flex size-[71px] flex-col items-center justify-center ${isSelected ? 'rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.1)]' : ''}`}
      onClick={onClick}
    >
      <SVGIcon name={type} width={35} height={35} active={isIconActive} />
      <span className="mt-[8px] text-12 font-normal text-black">{label}</span>
    </div>
  );
};
