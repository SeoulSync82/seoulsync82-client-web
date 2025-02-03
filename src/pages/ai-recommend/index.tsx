import clsx from 'clsx';
import { useLocation } from 'react-router';
import { useCourseRecommend, usePlaceCustomize } from '@/service/course/useCourseService';
import { useEffect, useState } from 'react';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useThemesList } from '@/service/theme/useThemeService';
import { CustomPlaceItem } from '@/service/course/types';
import { useQueryParams } from '@/hooks/useQueryParams';
import TabButton from '@/components/buttons/tab';
import BottomButton from '@/components/buttons/bottom/BottomButton';
import SelectSubwayView from '@/components/pages/ai-recommend/SelectSubwayView';
import SelectThemeView from '@/components/pages/ai-recommend/SelectThemeView';
import SelectCustomView from '@/components/pages/ai-recommend/SelectCustomView';
import ModalOuter from '@/components/modals/ModalOuter';
import AddPlaceModal from '@/components/modals/add-place/AddPlaceModal';
import useModal from '@/hooks/useModal';
import { useStore } from 'zustand';
import { useBoundStore } from '@/stores';

const TAB_TYPES = {
  SUBWAY: 'subway',
  THEME: 'theme',
  CUSTOM: 'custom',
};
const THREE_POINT_FIVE_STARS_THEME_UUID = 'c4ca35dff1a85b6788f66e864f58958a'; // 별점 3.5이상

export default function AiRecommend() {
  const { searchParams, updateQueryParam } = useQueryParams();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { lineUuid, stationUuid, themeUuid, placeUuidList, customPlaceType, setPlaceUuidList } =
    useBoundStore((state) => state);

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
      place_uuids: placeUuidList?.join(','),
      place_type: customPlaceType.toUpperCase(),
      station_uuid: stationUuid,
      theme_uuid: '',
    },
    {
      enabled: !!customPlaceType && !!courseRecommendData?.data?.items.places.length,
    },
  );

  useEffect(() => {
    const placeUuids = courseRecommendData?.data.items.places.map((item) => item.uuid);
    const customPlaceUuid = customPlaceData?.data.items.uuid;
    const newPlaceUuidList = customPlaceUuid ? [...placeUuids, customPlaceUuid] : placeUuids;
    setPlaceUuidList(newPlaceUuidList);
  }, [courseRecommendData]);

  console.log(111, placeUuidList);
  const isSelectButtonDisabled =
    (type === TAB_TYPES.SUBWAY && (!lineUuid || !stationUuid)) ||
    (type === TAB_TYPES.THEME && (!lineUuid || !stationUuid || !themeUuid));

  const onClickTabButton = (e: MouseEvent, item: { label: string; type: string }) => {
    const isTabButtonDisabled =
      type === TAB_TYPES.SUBWAY || (type === TAB_TYPES.THEME && item.type === TAB_TYPES.CUSTOM);

    if (isTabButtonDisabled) {
      e.preventDefault();
      return;
    }
    updateQueryParam('type', item.type);
  };
  const onClickSelectButton = () => {
    if (type === TAB_TYPES.SUBWAY && lineUuid && stationUuid) {
      updateQueryParam('type', TAB_TYPES.THEME);
    } else if (type === TAB_TYPES.THEME && lineUuid && stationUuid && themeUuid) {
      updateQueryParam('type', TAB_TYPES.CUSTOM);
    }
  };

  const handleAddPlace = (message: string) => {
    if (message === 'openAddPlaceModal') {
      openModal();
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
          <SelectSubwayView subwayLineData={subwayLineData} subwayStationData={subwayStationData} />
        )}
        {type === TAB_TYPES.THEME && <SelectThemeView themeData={themeData} />}
        {type === TAB_TYPES.CUSTOM && (
          <SelectCustomView
            courseRecommendData={courseRecommendData}
            onClickAddPlace={handleAddPlace}
          />
        )}
      </div>
      <BottomButton disabled={isSelectButtonDisabled} onClick={() => onClickSelectButton()}>
        {type !== TAB_TYPES.CUSTOM ? '선택하기' : '완료'}
      </BottomButton>
      {isModalOpen && <AddPlaceModal onClose={closeModal} />}
    </div>
  );
}
