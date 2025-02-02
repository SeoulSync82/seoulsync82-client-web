import clsx from 'clsx';
import { useLocation } from 'react-router';
import { useCourseRecommend } from '@/service/course/useCourseService';
import TabButton from '@/components/buttons/tab';
import BottomButton from '@/components/buttons/bottom/BottomButton';
import SelectSubwayView from '@/components/pages/ai-recommend/SelectSubwayView';
import SelectThemeView from '@/components/pages/ai-recommend/SelectThemeView';
import SelectCustomView from '@/components/pages/ai-recommend/SelectCustomView';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useThemesList } from '@/service/theme/useThemeService';
import { useQueryParams } from '@/hooks/useQueryParams';

const TAB_TYPES = {
  SUBWAY: 'subway',
  THEME: 'theme',
  CUSTOM: 'custom',
};
const DEFAULT_LINE_UUID = '077ff3adc0e556148bf7eeb7a0273fb9'; // 1호선
const THREE_POINT_FIVE_STARS_THEME_UUID = 'c4ca35dff1a85b6788f66e864f58958a'; // 별점 3.5이상

export default function AiRecommend() {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const type = searchParams.get('type');
  const tabItems = [
    {
      label: '역주변',
      type: TAB_TYPES.SUBWAY,
      disabled: undefined,
    },
    {
      label: '테마선택',
      type: TAB_TYPES.THEME,
      disabled: type === TAB_TYPES.SUBWAY,
    },
    {
      label: '커스텀',
      type: TAB_TYPES.CUSTOM,
      disabled: type === TAB_TYPES.SUBWAY || type === TAB_TYPES.THEME,
    },
  ];

  const line_uuid = searchParams.get('line_uuid') || DEFAULT_LINE_UUID;
  const station_uuid = searchParams.get('station_uuid');
  const theme_uuid = searchParams.get('theme_uuid');

  const { data: subwayLineData } = useSubwayLines();
  const { data: subwayStationData } = useSubwayStations(line_uuid as string, {
    enabled: !!line_uuid,
  });
  const { data: themeData } = useThemesList();
  const { data: courseRecommendData } = useCourseRecommend(
    { enabled: !!station_uuid && !!theme_uuid },
    station_uuid as string,
    theme_uuid === THREE_POINT_FIVE_STARS_THEME_UUID ? '' : (theme_uuid as string),
  );

  const { updateQueryParam, deleteQueryParam } = useQueryParams();
  const navigateOptions = {
    state: { previousPath: `${pathname}?type=${type}` },
    replace: true,
  };

  const isSelectButtonDisabled =
    (type === TAB_TYPES.SUBWAY && (!line_uuid || !station_uuid)) ||
    (type === TAB_TYPES.THEME && (!line_uuid || !station_uuid || !theme_uuid));

  const onClickTabButton = (e: MouseEvent, item: { label: string; type: string }) => {
    const isTabButtonDisabled =
      type === TAB_TYPES.SUBWAY || (type === TAB_TYPES.THEME && item.type === TAB_TYPES.CUSTOM);

    if (isTabButtonDisabled) {
      e.preventDefault();
      return;
    }
    updateQueryParam('type', item.type, navigateOptions);
  };

  const onClickSubwayLine = (item: any) => {
    updateQueryParam('line_uuid', item.uuid, navigateOptions);
    deleteQueryParam('station_uuid');
  };
  const onClickSubwayStation = (item: any) => {
    updateQueryParam('station_uuid', item.uuid, navigateOptions);
  };
  const onClickTheme = (item: any) => {
    updateQueryParam('theme_uuid', item.uuid, navigateOptions);
  };
  const onClickCancelTheme = () => {
    deleteQueryParam('theme_uuid', navigateOptions);
  };
  const onClickSelectButton = () => {
    if (type === TAB_TYPES.SUBWAY && line_uuid && station_uuid) {
      updateQueryParam('type', TAB_TYPES.THEME, navigateOptions);
    } else if (type === TAB_TYPES.THEME && line_uuid && station_uuid && theme_uuid) {
      updateQueryParam('type', TAB_TYPES.CUSTOM, navigateOptions);
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
        {type === TAB_TYPES.SUBWAY && (
          <SelectSubwayView
            subwayLineData={subwayLineData}
            subwayStationData={subwayStationData}
            onClickSubwayLine={onClickSubwayLine}
            onClickSubwayStation={onClickSubwayStation}
          />
        )}
        {type === TAB_TYPES.THEME && (
          <SelectThemeView
            themeData={themeData}
            onClickTheme={onClickTheme}
            onClickCancelTheme={onClickCancelTheme}
          />
        )}
        {type === TAB_TYPES.CUSTOM && (
          <SelectCustomView courseRecommendData={courseRecommendData} />
        )}
      </div>
      <BottomButton disabled={isSelectButtonDisabled} onClick={() => onClickSelectButton()}>
        {type !== TAB_TYPES.CUSTOM ? '선택하기' : '완료'}
      </BottomButton>
    </div>
  );
}
