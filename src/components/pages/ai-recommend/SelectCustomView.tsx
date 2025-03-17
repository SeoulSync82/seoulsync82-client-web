import React, { forwardRef, useState } from 'react';
import { Link } from 'react-router';
import { useBoundStore } from '@/stores';
import { CustomPlaceItem as CustomPlaceItemType } from '@/service/course/types';
import SVGIcon from '@/components/SvgIcon';
import Tag from '@/components/Tag';

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
      <div className="flex overflow-y-hidden">
        <div className="mb-[76px] h-full w-full bg-white px-[20px]">
          {/* 추가 버튼 영역 */}
          <div
            onClick={() => onClickAddCustomPlace('openAddPlaceModal')}
            className="my-4 flex h-[77px] w-full cursor-pointer items-center rounded-lg bg-gray-50 px-5 shadow-[2px_2px_8px_0_rgba(0,0,0,0.1)]"
          >
            <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full bg-primary-500">
              <SVGIcon name="Plus" width={24} height={24} active={false} />
            </div>
            <div className="ml-3 text-black">
              <p className="mb-2 text-16 font-semibold">플러스를 누르면 추가할 수 있어요 !</p>
              <p className="text-12 font-medium text-primary-500">다른 장소 추천받기</p>
            </div>
          </div>
          {customPlaceList?.map((place: any) => (
            <CustomPlaceItem
              key={place.uuid}
              place={place}
              onDeletePlace={handleDeletePlace}
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
  onDeletePlace: (uuid: string) => void;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const CustomPlaceItem = forwardRef<HTMLDivElement, CustomPlaceItemProps>(function CustomPlaceItem(
  { place, onDeletePlace, forwardedRef },
  ref,
) {
  const [expanded, setExpanded] = useState(true);
  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="mb-[16px] flex min-h-[70px] w-full items-start" ref={forwardedRef || ref}>
      <div className="flex w-full">
        <CustomPlaceSymbol>{place.sort}</CustomPlaceSymbol>
        <div className="flex w-full flex-col items-center justify-start">
          <div className="flex w-full items-center justify-between pl-[16px]">
            <div className="flex items-start text-14 font-normal text-gray-300">
              {PLACE_TYPES[place.place_type as keyof typeof PLACE_TYPES]}
            </div>
            <Tag
              size="small"
              color="gray100"
              content="삭제"
              onClick={() => onDeletePlace(place.uuid)}
            />
          </div>
          <div
            className={`${expanded ? 'mt-[16px] bg-gray-50 p-[16px]' : ''} flex max-h-[128px] w-full flex-col gap-[8px] rounded-[8px]`}
          >
            <button
              onClick={handleToggle}
              className={`${expanded ? '' : 'mt-[16px] px-[16px]'} flex w-full items-center justify-between`}
            >
              <div className="text-16 font-semibold text-gray-900">{place.place_name}</div>
              <SVGIcon
                name="Arrow"
                width={16}
                height={16}
                className={`${expanded ? 'rotate-[90deg]' : 'rotate-[270deg]'} cursor-pointer transition-all duration-300 ease-in-out`}
              />
            </button>
            {expanded && (
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
                        to={`/map?latitude=${place.latitude}&longitude=${place.longitude}`}
                        target="_blank"
                        className="text-12 font-bold text-primary-500"
                      >
                        지도보기
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SVGIcon name="FullStar" width={14} height={14} />
                    <span className="text-12 font-normal text-gray-900">{place.score}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
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
