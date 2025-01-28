import clsx from 'clsx';
import TabButton from '@/components/buttons/tab';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useCourseRecommend } from '@/service/course/useCourseService';
import BottomButton from '@/components/buttons/bottom/BottomButton';
import SelectSubwayView from '@/components/pages/ai-recommend/SelectSubwayView';
import SelectThemeView from '@/components/pages/ai-recommend/SelectThemeView';

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
