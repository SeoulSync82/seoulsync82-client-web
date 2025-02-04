import SVGIcon from '@/components/svg-icon/SVGIcon';
import Tag from '@/components/tag/Tag';
import { useBoundStore } from '@/stores';
import { forwardRef, useState } from 'react';

const LINE_COLORS = {
  1: '#FFC700',
  2: '#9070CF',
  3: '#6495ED',
  4: '#90D690',
  5: '#F04F09',
  6: '#705F30',
};
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

export default forwardRef(function SelectCustomView(
  {
    onClickAddCustomPlace,
  }: {
    onClickAddCustomPlace: (message: string) => void;
  },
  ref,
) {
  const [isPlaceOpen, setIsPlaceOpen] = useState(true);
  const { customPlaceList, setCustomPlaceList } = useBoundStore((state) => state);

  const onClickDeletePlace = (uuid: string) => {
    const filteredList = customPlaceList.filter((item) => item.uuid !== uuid);
    setCustomPlaceList(filteredList);
  };
  const onClickPlaceToggle = () => {
    setIsPlaceOpen(!isPlaceOpen);
  };

  return (
    <div className="flex h-[calc(100vh-106px)] overflow-y-scroll">
      <div className="mb-[76px] h-full w-full bg-white px-[20px]">
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
        {customPlaceList?.map((place, idx) => (
          <div key={idx} className="mb-[16px] flex w-full items-center justify-between ">
            {isPlaceOpen ? (
              <div className="flex w-full">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative mr-2 h-fit w-fit">
                    <SVGIcon name="Line" width={33} height={33} active={false} />
                    <p className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-2 text-10 text-white">
                      {place.sort}
                    </p>
                  </div>
                  <hr className="mr-[8px] mt-[4px] h-[calc(100%-8px)] w-0 border-[1px] border-dashed" />
                </div>
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="mb-[14px] mt-[5px] text-14 font-normal text-gray-300">
                      {PLACE_TYPES[place.place_type as keyof typeof PLACE_TYPES]}
                    </div>
                    <Tag
                      size="small"
                      color="gray100"
                      content="삭제"
                      onClick={() => onClickDeletePlace(place.uuid)}
                    />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div ref={ref} className="w-full rounded-lg bg-gray-50 p-4">
                      <div className="mb-3 flex w-full items-center justify-between">
                        <p className="text-16 text-1620 font-bold text-black">{place.place_name}</p>
                        <SVGIcon
                          name="Arrow"
                          width={16}
                          height={16}
                          active={false}
                          className="rotate-[90deg]"
                          onClick={onClickPlaceToggle}
                        />
                      </div>
                      <div className="flex items-center gap-[10px]">
                        <img
                          src={place.thumbnail}
                          className="size-[68px] min-w-[68px] rounded-lg object-cover"
                        />
                        <div className="flex w-full items-center justify-between gap-[22px]">
                          <div className="flex flex-col gap-[8px]">
                            <div className="line-clamp-2 break-all text-14 font-normal leading-[18px] text-gray-500">
                              {place.address}
                            </div>
                            <div className="flex items-center">
                              <p className="text-12 font-bold text-primary-500">지도보기</p>
                              <SVGIcon
                                name="Arrow"
                                width={12}
                                height={12}
                                className="rotate-[270deg]"
                                onClick={onClickPlaceToggle}
                              />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <SVGIcon
                              name="FullStar"
                              width={14}
                              height={14}
                              active={false}
                              color={'#9070CF'}
                            />
                            <p className="text-12 font-normal text-gray-900">{place.score}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-[16px] flex w-full">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mr-2 h-fit w-fit">
                      <SVGIcon name="Line" width={33} height={33} active={false} />
                      <p className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-2 text-10 text-white">
                        {place.sort}
                      </p>
                    </div>
                    <hr className="mr-[8px] mt-[4px] h-[calc(100%-8px)] w-0 border-[1px] border-dashed" />
                  </div>
                  <div className="w-full">
                    <div className="flex w-full justify-between">
                      <div className="mt-[5px] text-14 font-normal text-gray-300">
                        {PLACE_TYPES[place.place_type as keyof typeof PLACE_TYPES]}
                      </div>
                      <Tag size="small" color="gray100" content="삭제" />
                    </div>
                    <div className="mt-[16px] flex items-center justify-between">
                      <div className="text-16 font-semibold text-gray-900">{place.place_name}</div>
                      <SVGIcon
                        name="Arrow"
                        width={16}
                        height={16}
                        onClick={onClickPlaceToggle}
                        className="mr-[8px] rotate-[270deg]"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
