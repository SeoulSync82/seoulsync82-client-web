import Button from '@/components/buttons/Button';
import TabButton from '@/components/buttons/tab';
import { useLocation, useNavigate } from 'react-router';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useThemesList } from '@/service/theme/useThemeService';
import Chip from '@/components/chip/Chip';
import { useCourseRecommend } from '@/service/course/useCourseService';
import BottomButton from '@/components/buttons/bottom-button/BottomButton';

export default function AiRecommend() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const line_uuid = searchParams.get('line_uuid');
  const station_uuid = searchParams.get('station_uuid');
  const theme_uuid = searchParams.get('theme_uuid');
  const type = searchParams.get('type') || 'subway';

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
      <div className="w-full overflow-y-scroll">{currentView}</div>
      <BottomButton disabled={isBottomButtonDisabled} onClick={() => onClickSelectButton()}>
        {type !== 'custom' ? '선택하기' : '완료'}
      </BottomButton>
    </div>
  );
}

const SelectSubwayView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const line_uuid = searchParams.get('line_uuid');
  const station_uuid = searchParams.get('station_uuid');

  const { data: subwayData } = useSubwayLines();
  const { data: stationData } = useSubwayStations(line_uuid as string, {
    enabled: !!line_uuid,
  });

  const updateQueryParam = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };
  const deleteQueryParam = (key: string) => {
    searchParams.delete(key);
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  const onClickSubwayLine = (item: any) => {
    updateQueryParam('line_uuid', item.uuid);
    deleteQueryParam('station_uuid');
  };
  const onClickSubwayStation = (item: any) => {
    updateQueryParam('station_uuid', item.uuid);
  };

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="hide-scroll flex grow basis-1/3 flex-col overflow-y-auto bg-gray-100">
        {subwayData?.data.items.map((item) => (
          <Button
            size="small"
            bgColor="gray100"
            textColor={line_uuid === item.uuid ? 'primary' : 'gray400'}
            borderPosition="bottom"
            borderSize="thin"
            key={item.uuid}
            isActive={line_uuid === item.uuid}
            onClick={() => onClickSubwayLine(item)}
            className="border-b border-gray-200"
          >
            {item.line}
          </Button>
        ))}
      </div>
      <div className="hide-scroll flex grow basis-2/3 flex-col overflow-y-auto">
        {stationData?.data.items.map((item) => (
          <Button
            size="small"
            bgColor={station_uuid === item.uuid ? 'primary' : 'white'}
            textColor={station_uuid === item.uuid ? 'white' : 'gray400'}
            isActive={station_uuid === item.uuid}
            borderPosition="bottom"
            borderSize="thin"
            key={item.uuid}
            onClick={() => onClickSubwayStation(item)}
            className="border-b border-gray-200 text-16 font-normal"
          >
            {item.station}
          </Button>
        ))}
      </div>
    </div>
  );
};

const SelectThemeView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const theme_uuid = searchParams.get('theme_uuid');

  const [selectedTheme, setSelectedTheme] = useState(theme_uuid);

  const { data: themeData } = useThemesList();

  useEffect(() => {
    const theme = themeData?.data.items.find((v) => v.uuid === theme_uuid);
    setSelectedTheme(theme);
  }, [theme_uuid]);

  const updateQueryParam = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };
  const deleteQueryParam = (key: string) => {
    searchParams.delete(key);
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  const onClickTheme = (item: any) => {
    updateQueryParam('theme_uuid', item.uuid);
    setSelectedTheme(item);
  };
  const onClickCancelTheme = () => {
    deleteQueryParam('theme_uuid');
    setSelectedTheme(null);
  };

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="flex flex-col">
        {selectedTheme && (
          <div className="flex h-fit w-full flex-col">
            <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
              내가 선택한 테마
            </div>
            <div className="ml-5 flex flex-row flex-wrap gap-2">
              {selectedTheme && (
                <Chip
                  size={'medium'}
                  active={true}
                  content={selectedTheme?.theme_name}
                  onClickCancel={onClickCancelTheme}
                />
              )}
            </div>
          </div>
        )}
        <div className="h-[60px] h-fit w-full flex-col">
          <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
            테마 선택하기
          </div>
          <div className="ml-5 flex flex-row flex-wrap gap-2">
            {themeData?.data.items.map((item) => (
              <Chip
                size="medium"
                content={item.theme_name}
                key={item.uuid}
                active={item.theme_name === selectedTheme?.theme_name}
                onClick={() => onClickTheme(item)}
                onClickCancel={onClickCancelTheme}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="w-full px-5 pb-[76px]">
        <div className="my-4">
          <div>AddCustomPlaceItem</div>
        </div>
        {courseRecommendData?.data?.items.places.map((place) => (
          <div className="w-full" key={`place-${place.uuid}`}>
            {place.place_name}
          </div>
        ))}
      </div>
    </div>
  );
};
