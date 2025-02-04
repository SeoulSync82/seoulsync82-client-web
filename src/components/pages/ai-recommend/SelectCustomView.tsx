import React, { forwardRef, useState } from 'react';
import { Link } from 'react-router';
import { useBoundStore } from '@/stores';
import { CustomPlaceItem as CustomPlaceItemType } from '@/service/course/types';
import SVGIcon from '@/components/svg-icon/SVGIcon';
import Tag from '@/components/tag/Tag';

export const PLACE_TYPES = {
  RESTAURANT: '음식점',
  CAFE: '카페',
  BAR: '술집',
  SHOPPING: '쇼핑',
  CULTURE: '문화',
  ENTERTAINMENT: '놀거리',
  EXHIBITION: '전시',
  POPUP: '팝업',
};
interface SelectCustomViewProps {
  onClickAddCustomPlace: (message: string) => void;
}

const SelectCustomView = forwardRef<HTMLDivElement, SelectCustomViewProps>(
  function SelectCustomView({ onClickAddCustomPlace }, ref) {
    const { customPlaceList, setCustomPlaceList } = useBoundStore((state) => state);

    const handleDeletePlace = (uuid: string) => {
      const filteredList = customPlaceList.filter((item: any) => item.uuid !== uuid);
      setCustomPlaceList(filteredList);
    };

    return (
      <div className="flex h-[calc(100vh-106px)] overflow-y-scroll">
        <div className="mb-[76px] h-full w-full bg-white px-[20px]">
          {/* 추가 버튼 영역 */}
          <div className="my-4 flex h-[77px] w-full items-center rounded-lg bg-gray-50 px-5 shadow-[2px_2px_8px_0_rgba(0,0,0,0.1)]">
            <div
              onClick={() => onClickAddCustomPlace('openAddPlaceModal')}
              className="flex size-[36px] cursor-pointer items-center justify-center rounded-full bg-primary-500"
            >
              <SVGIcon name="Plus" width={24} height={24} active={false} />
            </div>
            <div className="ml-3 text-black">
              <p className="mb-2 text-16 font-semibold">플러스를 누르면 추가할 수 있어요 !</p>
              <p className="text-12 font-medium text-primary-500">다른 장소 추천받기</p>
            </div>
          </div>
          {/* 장소 리스트 */}
          {customPlaceList?.map((place: any) => (
            <CustomPlaceItem
              key={place.uuid}
              place={place}
              onDelete={handleDeletePlace}
              forwardedRef={ref}
            />
          ))}
        </div>
      </div>
    );
  },
);
export default SelectCustomView;

interface CustomPlaceItemProps {
  place: CustomPlaceItemType;
  onDelete: (uuid: string) => void;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const CustomPlaceItem = forwardRef<HTMLDivElement, CustomPlaceItemProps>(function CustomPlaceItem(
  { place, onDelete, forwardedRef },
  ref,
) {
  // 여기서는 각 항목별로 확장 여부(expanded)를 내부 상태로 관리합니다.
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="mb-[16px] flex min-h-[70px] w-full items-start" ref={forwardedRef || ref}>
      <div className="flex w-full">
        <CustomPlaceSymbol>{place.sort}</CustomPlaceSymbol>
        <div className="flex w-full flex-col items-center justify-start">
          <CustomPlaceHeader placeType={place.place_type} onDelete={() => onDelete(place.uuid)} />
          {expanded ? (
            <CustomPlaceCard place={place} onToggle={handleToggle} />
          ) : (
            <CustomPlaceTitle
              placeName={place.place_name}
              onToggle={handleToggle}
              className="mt-[16px] px-[16px]"
            />
          )}
        </div>
      </div>
    </div>
  );
});

const CustomPlaceSymbol = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-fit w-fit">
        <SVGIcon name="Line" width={33} height={33} active={false} />
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-2 text-10 text-white">
          {children}
        </div>
      </div>
      <hr className="mt-[4px] h-[100%] w-0 border-[1px] border-dashed" />
    </div>
  );
};

const CustomPlaceHeader = ({
  placeType,
  onDelete,
}: {
  placeType: string;
  onDelete: () => void;
}) => {
  return (
    <div className="flex w-full items-center justify-between pl-[16px]">
      <div className="flex items-start text-14 font-normal text-gray-300">
        {PLACE_TYPES[placeType as keyof typeof PLACE_TYPES]}
      </div>
      <Tag size="small" color="gray100" content="삭제" onClick={onDelete} />
    </div>
  );
};

const CustomPlaceTitle = ({
  className,
  placeName,
  onToggle,
}: {
  placeName: string;
  onToggle: () => void;
  className?: string;
}) => {
  return (
    <div className={`flex w-full items-center justify-between ${className}`}>
      <div className="text-16 font-semibold text-gray-900">{placeName}</div>
      <SVGIcon
        name="Arrow"
        width={16}
        height={16}
        onClick={onToggle}
        className="rotate-[90deg] cursor-pointer"
      />
    </div>
  );
};

const CustomPlaceCard = ({
  place,
  onToggle,
}: {
  place: CustomPlaceItemType;
  onToggle: () => void;
}) => {
  return (
    <div className="mt-[16px] flex h-[128px] w-full flex-col gap-[8px] rounded-[8px] bg-gray-50 p-[16px]">
      <CustomPlaceTitle placeName={place.place_name} onToggle={onToggle} />
      <div className="flex w-full items-center gap-[10px]">
        <img
          src={place.thumbnail}
          alt={place.place_name}
          className="size-[68px] min-w-[68px] rounded-lg object-cover"
        />
        <div className="flex w-full items-center justify-between gap-[22px]">
          <div className="flex flex-col gap-[8px]">
            <div className="line-clamp-2 break-all text-14 font-normal leading-[18px] text-gray-500">
              {place.address}
            </div>
            <div className="flex items-center">
              <Link
                to={`http://map.naver.com/?dlevel=7&pinType=site&pinId=13490999&x=${place.longitude}&y=${place.latitude}&enc=b64`}
                className="text-12 font-bold text-primary-500"
              >
                지도보기
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <SVGIcon name="FullStar" width={14} height={14} active={false} color="#9070CF" />
            <span className="text-12 font-normal text-gray-900">{place.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
