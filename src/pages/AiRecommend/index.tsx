import { useEffect, useState } from 'react';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useThemesList } from '@/service/theme/useThemeService';
import { TabButton } from '@/components/Button';
import { BottomButton } from '@/components/Button';
import SelectSubwayView from '@/components/pages/ai-recommend/SelectSubwayView';
import SelectThemeView from '@/components/pages/ai-recommend/SelectThemeView';
import SelectCustomView from '@/components/pages/ai-recommend/SelectCustomView';
import { useBoundStore } from '@/stores';
import { useAiCourseRecommend, useSaveRecommendCourse } from '@/service/course/useCourseService';

const THEME_UUID_OVER_THREE_POINT_FIVE_STARS = 'c4ca35dff1a85b6788f66e864f58958a'; // 별점 3.5이상
const aiRecommendSteps = [
  {
    name: '역 주변',
    component: SelectSubwayView,
  },
  {
    name: '테마선택',
    component: SelectThemeView,
  },
  {
    name: '커스텀',
    component: SelectCustomView,
  },
];

export default function AiRecommend() {
  const customCourseData = useBoundStore((state) => state.customCourseData);
  const setCustomCourseData = useBoundStore((state) => state.setCustomCourseData);
  const resetCustomCourseData = useBoundStore((state) => state.resetCustomCourseData);

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const { data: subwayLineData } = useSubwayLines();
  const { data: subwayStationData } = useSubwayStations(customCourseData.lineUuid as string, {
    enabled: !!customCourseData.lineUuid,
  });
  const { data: themeData } = useThemesList();
  const { data: aiRecommendCourseData } = useAiCourseRecommend(
    customCourseData.stationUuid as string,
    customCourseData.themeUuid !== THEME_UUID_OVER_THREE_POINT_FIVE_STARS
      ? (customCourseData.themeUuid as string)
      : '',
    {
      enabled: !!customCourseData.stationUuid && !!customCourseData.themeUuid,
    },
  );
  // const { data: customPlaceData } = usePlaceCustomize(
  //   {
  //     place_uuids: customCourseData.placeList?.map((place: any) => place?.uuid).join(','),
  //     place_type: customCourseData.placeType.toUpperCase(),
  //     station_uuid: customCourseData.stationUuid,
  //     theme_uuid: customCourseData.themeUuid,
  //     course_uuid: customCourseData.courseUuid,
  //     course_name: customCourseData.courseName,
  //   },
  //   {
  //     enabled: !!customCourseData.placeType,
  //   },
  // );
  const { mutate: saveAiRecommendCourse } = useSaveRecommendCourse();

  // useEffect(() => {
  //   const recommendPlaceList = courseRecommendData?.data?.items?.places || [];
  //   const customPlace = customPlaceData?.data?.items ? [customPlaceData?.data?.items] : [];
  //   setCustomCourseData({
  //     ...customCourseData,
  //     placeList: [...recommendPlaceList, ...customPlace],
  //   });
  // }, [courseRecommendData, customPlaceData]);

  // useEffect(() => {
  //   console.log('## custom place list: ', customCourseData.placeList);
  // }, [customCourseData.placeList]);

  // const isBottomButtonDisabled =
  //   (currentStepIdx === 0 && (!customCourseData.lineUuid || !customCourseData.stationUuid)) ||
  //   (currentStepIdx === 1 &&
  //     (!customCourseData.lineUuid || !customCourseData.stationUuid || !customCourseData.themeUuid));

  const onClickBottomButton = () => {
    if (currentStepIdx === 0 && customCourseData.lineUuid && customCourseData.stationUuid) {
    } else if (
      currentStepIdx === 1 &&
      customCourseData.lineUuid &&
      customCourseData.stationUuid &&
      customCourseData.themeUuid
    ) {
    } else if (currentStepIdx === 2) {
      const aiRecommendCourseData = {
        subway: { uuid: customCourseData.lineUuid, station: customCourseData.stationUuid },
        theme: { uuid: customCourseData.themeUuid, theme: 'customCourseData.themeName' },
        course_uuid: customCourseData.courseUuid,
        course_name: customCourseData.courseName,
        places: customCourseData.placeList,
      };
      if (customCourseData.placeList.length < 3) {
        alert('toast: 3개 이상의 장소를 추가해주세요.');
        return;
      }
      saveAiRecommendCourse(aiRecommendCourseData);
    }
    setCurrentStepIdx((prev) => prev + 1);
  };

  const TabButtonGroup = () => {
    const isTabButtonDisabled = (idx: number) => idx > currentStepIdx;
    const onClickTabButton = (idx: number) => {
      if (isTabButtonDisabled(idx)) return;
      setCurrentStepIdx(idx);
    };

    return (
      <div className="flex w-full">
        {aiRecommendSteps.map(({ name }, idx) => (
          <TabButton
            key={`tab-${idx}`}
            active={currentStepIdx === idx}
            disabled={isTabButtonDisabled(idx)}
            onClick={() => onClickTabButton(idx)}
          >
            {name}
          </TabButton>
        ))}
      </div>
    );
  };

  const CurrentStepView = aiRecommendSteps[currentStepIdx].component;
  const currentStepData = (() => {
    switch (currentStepIdx) {
      case 0: // subway
        return {
          lineData: subwayLineData?.data,
          stationData: subwayStationData?.data,
        };
      case 1: // theme
        return {
          themeData: themeData?.data,
        };
      default:
        return undefined;
    }
  })();

  return (
    <>
      <TabButtonGroup />
      <CurrentStepView data={currentStepData} />
      <BottomButton onClick={onClickBottomButton}>
        {currentStepIdx === 2 ? '완료' : '선택하기'}
      </BottomButton>
    </>
  );
}
