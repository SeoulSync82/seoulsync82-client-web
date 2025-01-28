import clsx from 'clsx';
import TabButton from '@/components/buttons/tab';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useCourseRecommend } from '@/service/course/useCourseService';
import BottomButton from '@/components/buttons/bottom/BottomButton';
import SelectSubwayView from '@/components/pages/ai-recommend/SelectSubwayView';
import SelectThemeView from '@/components/pages/ai-recommend/SelectThemeView';
import SVGIcon from '@/components/svg-icon/SVGIcon';
import Tag from '@/components/tag/Tag';

export default function AiRecommend() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const line_uuid = searchParams.get('line_uuid') || '077ff3adc0e556148bf7eeb7a0273fb9';
  const station_uuid = searchParams.get('station_uuid');
  const theme_uuid = searchParams.get('theme_uuid');
  const type = searchParams.get('type');

  const tabItems = [
    {
      label: '역주변',
      type: 'subway',
      disabled: undefined,
    },
    {
      label: '테마선택',
      type: 'theme',
      disabled: type === 'subway',
    },
    {
      label: '커스텀',
      type: 'custom',
      disabled: type === 'subway' || type === 'theme',
    },
  ];

  const selectViewOptions: Record<string, React.ReactElement> = {
    subway: <SelectSubwayView />,
    theme: <SelectThemeView />,
    custom: <SelectCustomView />,
  };
  const [currentView, setCurrentView] = useState(selectViewOptions[type]);

  const onClickSelectButton = () => {
    if (type === 'subway' && line_uuid && station_uuid) {
      updateQueryParam('type', 'theme');
    } else if (type === 'theme' && line_uuid && station_uuid && theme_uuid) {
      updateQueryParam('type', 'custom');
    }
  };

  const updateQueryParam = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate({
      pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  const onClickTabButton = (e: MouseEvent, item: { label: string; type: string }) => {
    const isTabButtonDisabled = type === 'subway' || (type === 'theme' && item.type === 'custom');
    if (isTabButtonDisabled) {
      e.preventDefault();
      return;
    }
    setCurrentView(selectViewOptions[item.type]);
    updateQueryParam('type', item.type);
  };

  // TODO: BottomButton disabled 스타일 적용되도록 수정
  const isBottomButtonDisabled =
    (type === 'subway' && (!line_uuid || !station_uuid)) ||
    (type === 'theme' && (!line_uuid || !station_uuid || !theme_uuid));

  useEffect(() => {
    if (!type) {
      searchParams.set('type', 'subway');
      searchParams.set('line_uuid', line_uuid);
      navigate({
        pathname,
        search: `?${searchParams.toString()}`,
      });
    }
    setCurrentView(selectViewOptions[type]);
  }, [type]);

  if (!selectViewOptions[type]) return <></>;
  return (
    <div className="page w-full">
      <div className="flex w-full">
        {tabItems.map((item, idx) => (
          <TabButton
            key={`tab-${idx}`}
            title={item.label}
            active={type === item.type}
            className={clsx('flex-1')}
            onClick={(e: MouseEvent) => onClickTabButton(e, item)}
            disabled={item.disabled}
          />
        ))}
      </div>
      <div className="w-full">{currentView}</div>
      <BottomButton disabled={isBottomButtonDisabled} onClick={() => onClickSelectButton()}>
        {type !== 'custom' ? '선택하기' : '완료'}
      </BottomButton>
    </div>
  );
}

// TODO: 컴포넌트화
const SelectCustomView = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const station_uuid = searchParams.get('station_uuid');
  const theme_uuid = searchParams.get('theme_uuid');

  const { data: courseRecommendData } = useCourseRecommend(
    station_uuid as string,
    theme_uuid as string,
  );
  console.log('### courseRecommendData', courseRecommendData?.data.items);

  const onClickTheme = (item: any) => {};

  const PlaceType = {
    RESTAURANT: '음식점',
    CAFE: '카페',
    BAR: '술집',
    SHOPPING: '쇼핑',
    CULTURE: '문화',
    ENTERTAINMENT: '놀거리',
    EXHIBITION: '전시',
    POPUP: '팝업',
  };

  const LineIconColorVariants = (place) => {
    switch (place.sort) {
      case 1:
        return '#FFC700';
      case 2:
        return '#9070CF';
      case 3:
        return '#6495ED';
      case 4:
        return '#90D690';
      case 5:
        return '#F04F09';
      case 6:
        return '#705F30';
    }
  };

  const [isPlaceOpen, setIsCourseOpen] = useState(true);
  const onClickPlaceToggle = () => {
    setIsCourseOpen(!isPlaceOpen);
  };
  return (
    <div className="flex h-[calc(100vh-106px)] overflow-y-scroll">
      <div className="mb-[76px] h-full w-full bg-white px-[20px]">
        <div className="my-4 flex h-[77px] w-full items-center rounded-lg bg-gray-50 px-5 shadow-[2px_2px_8px_0_rgba(0,0,0,0.1)]">
          <div
            className="flex size-[36px] items-center justify-center rounded-full bg-primary-500"
            // onClick={click}
          >
            <SVGIcon name="Plus" width={24} height={24} active={false} />
          </div>
          <div className="ml-3 text-black">
            <p className="mb-2 text-16 font-semibold">플러스를 누르면 추가할 수 있어요 !</p>
            <p className="text-12 font-medium text-primary-500">다른 장소 추천받기</p>
          </div>
        </div>
        {courseRecommendData?.data?.items.places.map((place) => (
          <div className="flex w-full items-center justify-between">
            {isPlaceOpen ? (
              <div className="mb-[16px] flex w-full">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative mr-2 h-fit w-fit">
                    <SVGIcon
                      name="Line"
                      width={33}
                      height={33}
                      active={false}
                      color={LineIconColorVariants(place)}
                    />
                    <p className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-2 text-10 text-white">
                      {place.sort}
                    </p>
                  </div>
                  <hr className="mr-[8px] mt-[4px] h-[calc(100%-8px)] w-0 border-[1px] border-dashed" />
                </div>
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="mb-[14px] mt-[5px] text-14 font-normal text-gray-300">
                      {PlaceType[place.place_type as keyof typeof PlaceType]}
                    </div>
                    <Tag
                      size="small"
                      color="gray100"
                      content="삭제"
                      className="w-12"
                      onClick={() => {
                        console.log('deletePlaceItem');
                      }}
                    />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="w-full rounded-lg bg-gray-50 p-4">
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
                      <SVGIcon
                        name="Line"
                        width={33}
                        height={33}
                        active={false}
                        color={LineIconColorVariants(place)}
                      />
                      <p className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-2 text-10 text-white">
                        {place.sort}
                      </p>
                    </div>
                    <hr className="mr-[8px] mt-[4px] h-[calc(100%-8px)] w-0 border-[1px] border-dashed" />
                  </div>
                  <div className="w-full">
                    <div className="flex w-full justify-between">
                      <div className="mb-[14px] mt-[5px] text-14 font-normal text-gray-300">
                        {PlaceType[place.place_type as keyof typeof PlaceType]}
                      </div>
                      <Tag
                        size="small"
                        color="gray100"
                        content="삭제"
                        className="w-12"
                        onClick={() => {
                          console.log('deletePlaceItem');
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-20 font-semibold text-gray-900">{place.place_name}</div>
                      <SVGIcon
                        name="Arrow"
                        width={16}
                        height={16}
                        onClick={onClickPlaceToggle}
                        className="rotate-[270deg]"
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
};
