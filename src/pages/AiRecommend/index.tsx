import clsx from 'clsx';
import {
  useCourseRecommend,
  usePlaceCustomize,
  useSaveRecommendCourse,
} from '@/service/course/useCourseService';
import { useEffect } from 'react';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useThemesList } from '@/service/theme/useThemeService';
import { useQueryParams } from '@/hooks/useQueryParams';
import { TabButton } from '@/components/Button';
import { BottomButton } from '@/components/Button';
import SelectSubwayView from '@/components/pages/ai-recommend/SelectSubwayView';
import SelectThemeView from '@/components/pages/ai-recommend/SelectThemeView';
import SelectCustomView from '@/components/pages/ai-recommend/SelectCustomView';
import AddCustomPlaceModal from '@/components/Modal/AddCustomPlaceModal';
import useModal from '@/hooks/useModal';
import { useBoundStore } from '@/stores';
import { DEFAULT_LINE_UUID } from '@/constants';

const TAB_TYPES = {
  SUBWAY: 'subway',
  THEME: 'theme',
  CUSTOM: 'custom',
};
const TAB_ITEMS: TabItem[] = [
  {
    label: '역주변',
    type: TAB_TYPES.SUBWAY,
  },
  {
    label: '테마선택',
    type: TAB_TYPES.THEME,
  },
  {
    label: '커스텀',
    type: TAB_TYPES.CUSTOM,
  },
];
const THREE_POINT_FIVE_STARS_THEME_UUID = 'c4ca35dff1a85b6788f66e864f58958a'; // 별점 3.5이상

export type TabItem = { label: string; type: string; disabled?: boolean };

export default function AiRecommend() {
  const { searchParams, updateQueryParam } = useQueryParams();
  const { isModalOpen, openModal, closeModal: closeAddCustomPlaceModal } = useModal();
  const {
    lineUuid,
    stationUuid,
    themeUuid,
    customPlaceList,
    customPlaceType,
    setLineUuid,
    setStationUuid,
    setThemeUuid,
    setCustomPlaceList,
    setCustomPlaceType,
  } = useBoundStore((state) => state);

  const resetUUidData = () => {
    setLineUuid(DEFAULT_LINE_UUID);
    setStationUuid('');
    setThemeUuid('');
  };

  const type = searchParams.get('type');

  const { data: subwayLineData } = useSubwayLines();
  const { data: subwayStationData } = useSubwayStations(lineUuid as string, {
    enabled: !!lineUuid,
  });
  const { data: themeData } = useThemesList();
  const { data: courseRecommendData } = useCourseRecommend(
    stationUuid as string,
    themeUuid !== THREE_POINT_FIVE_STARS_THEME_UUID ? (themeUuid as string) : '',
    {
      enabled: !!stationUuid && !!themeUuid,
    },
  );
  const { data: customPlaceData } = usePlaceCustomize(
    {
      place_uuids: customPlaceList?.map((place: any) => place?.uuid).join(','),
      place_type: customPlaceType.toUpperCase(),
      station_uuid: stationUuid,
      theme_uuid: themeUuid,
    },
    {
      enabled: !!customPlaceType,
    },
  );
  const { mutate: saveRecommendCourse } = useSaveRecommendCourse();

  useEffect(() => {
    const recommendPlaceList = courseRecommendData?.data?.items?.places || [];
    const customPlace = customPlaceData?.data?.items ? [customPlaceData?.data?.items] : [];
    setCustomPlaceList([...recommendPlaceList, ...customPlace]);
  }, [courseRecommendData, customPlaceData]);

  useEffect(() => {
    console.log('## custom place list: ', customPlaceList);
  }, [customPlaceList]);

  const isTabButtonDisabled = (tab: TabItem) =>
    type === TAB_TYPES.SUBWAY || (type === TAB_TYPES.THEME && tab.type === TAB_TYPES.CUSTOM);
  const isBottomButtonDisabled =
    (type === TAB_TYPES.SUBWAY && (!lineUuid || !stationUuid)) ||
    (type === TAB_TYPES.THEME && (!lineUuid || !stationUuid || !themeUuid));

  const onClickTabButton = (item: TabItem) => {
    updateQueryParam('type', item.type);
  };
  const onClickBottomButton = () => {
    if (type === TAB_TYPES.SUBWAY && lineUuid && stationUuid) {
      updateQueryParam('type', TAB_TYPES.THEME);
    } else if (type === TAB_TYPES.THEME && lineUuid && stationUuid && themeUuid) {
      updateQueryParam('type', TAB_TYPES.CUSTOM);
    } else if (type === TAB_TYPES.CUSTOM) {
      const data = {
        station_uuid: stationUuid,
        theme_uuid: themeUuid,
        course_uuid: courseRecommendData?.data?.items.course_uuid,
        course_name: courseRecommendData?.data?.items.course_name,
        places: customPlaceList,
      };
      if (customPlaceList.length < 3) {
        alert('toast: 3개 이상의 장소를 추가해주세요.');
        return;
      }
      saveRecommendCourse(data);
    }
  };
  const handleClickAddCustomPlace = (message: string) => {
    if (message === 'openAddPlaceModal') {
      openModal();
    }
  };

  return (
    <div className="page w-full">
      <div className="flex w-full">
        {TAB_ITEMS.map((tab, idx) => (
          <TabButton
            key={`tab-${idx}`}
            active={type === tab.type}
            className={clsx('flex-1')}
            disabled={isTabButtonDisabled(tab)}
            onClick={() => onClickTabButton(tab)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>
      <div className="h-[calc(100dvh-162px)] w-full overflow-y-scroll">
        {type === TAB_TYPES.SUBWAY && (
          <SelectSubwayView subwayLineData={subwayLineData} subwayStationData={subwayStationData} />
        )}
        {type === TAB_TYPES.THEME && <SelectThemeView themeData={themeData} />}
        {type === TAB_TYPES.CUSTOM && (
          <SelectCustomView onClickAddCustomPlace={handleClickAddCustomPlace} />
        )}
      </div>
      <BottomButton disabled={isBottomButtonDisabled} onClick={onClickBottomButton}>
        {type !== TAB_TYPES.CUSTOM ? '선택하기' : '완료'}
      </BottomButton>
      {isModalOpen && <AddCustomPlaceModal onClose={closeAddCustomPlaceModal} />}
    </div>
  );
}
