import clsx from 'clsx';
import TabButton from '@/components/buttons/tab';
import { useLocation, useNavigate } from 'react-router';
import { useCourseRecommend } from '@/service/course/useCourseService';
import BottomButton from '@/components/buttons/bottom/BottomButton';
import SelectSubwayView from '@/components/pages/ai-recommend/SelectSubwayView';
import SelectThemeView from '@/components/pages/ai-recommend/SelectThemeView';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useThemesList } from '@/service/theme/useThemeService';
import SelectCustomView from '@/components/pages/ai-recommend/SelectCustomView';

export default function AiRecommend() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
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

  const line_uuid = searchParams.get('line_uuid') || '077ff3adc0e556148bf7eeb7a0273fb9';
  const station_uuid = searchParams.get('station_uuid');
  const theme_uuid = searchParams.get('theme_uuid');

  const { data: subwayLineData } = useSubwayLines();
  const { data: subwayStationData } = useSubwayStations(line_uuid as string, {
    enabled: !!line_uuid,
  });
  const { data: themeData } = useThemesList();
  const { data: courseRecommendData } = useCourseRecommend(
    station_uuid as string,
    theme_uuid as string,
  );

  const updateQueryParam = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate(
      {
        pathname,
        search: `?${searchParams.toString()}`,
      },
      { state: { previousPath: `${pathname}?type=${type}` } },
    );
  };
  const deleteQueryParam = (key: string) => {
    searchParams.delete(key);
    navigate(
      {
        pathname,
        search: `?${searchParams.toString()}`,
      },
      { state: { previousPath: `${pathname}?type=${type}` } },
    );
  };

  // TODO: BottomButton disabled 스타일 적용되도록 수정
  const isSelectButtonDisabled =
    (type === 'subway' && (!line_uuid || !station_uuid)) ||
    (type === 'theme' && (!line_uuid || !station_uuid || !theme_uuid));

  const onClickTabButton = (e: MouseEvent, item: { label: string; type: string }) => {
    const isTabButtonDisabled = type === 'subway' || (type === 'theme' && item.type === 'custom');
    if (isTabButtonDisabled) {
      e.preventDefault();
      return;
    }
    updateQueryParam('type', item.type);
  };
  const onClickSubwayLine = (item: any) => {
    updateQueryParam('line_uuid', item.uuid);
    deleteQueryParam('station_uuid');
  };
  const onClickSubwayStation = (item: any) => {
    updateQueryParam('station_uuid', item.uuid);
  };
  const onClickTheme = (item: any) => {
    updateQueryParam('theme_uuid', item.uuid);
  };
  const onClickCancelTheme = () => {
    deleteQueryParam('theme_uuid');
  };
  const onClickSelectButton = () => {
    if (type === 'subway' && line_uuid && station_uuid) {
      updateQueryParam('type', 'theme');
    } else if (type === 'theme' && line_uuid && station_uuid && theme_uuid) {
      updateQueryParam('type', 'custom');
    }
  };

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
      <div className="w-full">
        {type === 'subway' && (
          <SelectSubwayView
            subwayLineData={subwayLineData}
            subwayStationData={subwayStationData}
            onClickSubwayLine={onClickSubwayLine}
            onClickSubwayStation={onClickSubwayStation}
          />
        )}
        {type === 'theme' && (
          <SelectThemeView
            themeData={themeData}
            onClickTheme={onClickTheme}
            onClickCancelTheme={onClickCancelTheme}
          />
        )}
        {type === 'custom' && <SelectCustomView courseRecommendData={courseRecommendData} />}
      </div>
      <BottomButton disabled={isSelectButtonDisabled} onClick={() => onClickSelectButton()}>
        {type !== 'custom' ? '선택하기' : '완료'}
      </BottomButton>
    </div>
  );
}
