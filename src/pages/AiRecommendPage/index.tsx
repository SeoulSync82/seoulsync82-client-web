import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useThemesList } from '@/service/theme/useThemeService';
import { TabButton, BottomButton } from '@/components/Button';
import SelectSubwayStep from '@/components/pages/ai-recommend/SelectSubwayStep';
import SelectThemeStep from '@/components/pages/ai-recommend/SelectThemeStep';
import CustomCourseStep from '@/components/pages/ai-recommend/CustomCourseStep';
import { useBoundStore } from '@/stores';
import { useAiCourseRecommend, useSaveRecommendCourse } from '@/service/course/useCourseService';

const THEME_UUID_OVER_THREE_POINT_FIVE_STARS = 'c4ca35dff1a85b6788f66e864f58958a'; // 별점 3.5 이상

const aiRecommendSteps = [
  {
    name: '역 주변',
    component: SelectSubwayStep,
  },
  {
    name: '테마선택',
    component: SelectThemeStep,
  },
  {
    name: '커스텀',
    component: CustomCourseStep,
  },
];

export default function AiRecommendPage() {
  const navigate = useNavigate();
  const { customCourseData, resetCustomCourseData } = useBoundStore((state) => ({
    customCourseData: state.customCourseData,
    resetCustomCourseData: state.resetCustomCourseData,
  }));

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const { data: subwayLineData } = useSubwayLines();
  const { data: subwayStationData } = useSubwayStations(customCourseData.lineUuid as string, {
    enabled: !!customCourseData.lineUuid,
  });
  const { data: themeData } = useThemesList();
  const { data: aiRecommendCourseData } = useAiCourseRecommend(
    customCourseData.stationUuid,
    customCourseData.themeUuid !== THEME_UUID_OVER_THREE_POINT_FIVE_STARS
      ? customCourseData.themeUuid
      : '',
    {
      enabled: !!customCourseData.stationUuid && !!customCourseData.themeUuid,
    },
  );
  const { mutate: saveAiRecommendCourse } = useSaveRecommendCourse();

  const currentStepData = getCurrentStepData(currentStepIdx, {
    subwayLineData,
    subwayStationData,
    themeData,
    aiRecommendCourseData,
  });

  const isBottomButtonDisabled =
    (currentStepIdx === 0 && (!customCourseData.lineUuid || !customCourseData.stationUuid)) ||
    (currentStepIdx === 1 &&
      (!customCourseData.lineUuid ||
        !customCourseData.stationUuid ||
        !customCourseData.themeUuid)) ||
    (currentStepIdx === 2 && customCourseData.placeList.length < 3);

  const onClickBottomButton = () => {
    if (currentStepIdx === 2) {
      // Custom course step
      if (customCourseData.placeList.length < 3) {
        alert('toast: 3개 이상의 장소를 추가해주세요.');
        return;
      }
      const data = {
        station_uuid: customCourseData.stationUuid,
        theme_uuid: customCourseData.themeUuid,
        course_uuid: customCourseData.courseUuid,
        course_name: customCourseData.courseName,
        places: customCourseData.placeList,
      };
      saveAiRecommendCourse(data);
      resetCustomCourseData();
      navigate(`/course/${customCourseData.courseUuid}`);
      return;
    }
    setCurrentStepIdx((prev) => prev + 1);
  };

  const CurrentStepView = aiRecommendSteps[currentStepIdx].component;

  return (
    <>
      <TabButtonGroup
        currentStepIdx={currentStepIdx}
        onTabClick={(idx) => setCurrentStepIdx(idx)}
      />
      <CurrentStepView data={currentStepData} />
      <BottomButton disabled={isBottomButtonDisabled} onClick={onClickBottomButton}>
        {currentStepIdx === 2 ? '완료' : '선택하기'}
      </BottomButton>
    </>
  );
}

const TabButtonGroup = ({
  currentStepIdx,
  onTabClick,
}: {
  currentStepIdx: number;
  onTabClick: (idx: number) => void;
}) => {
  const isTabButtonDisabled = (idx: number) => idx > currentStepIdx;
  return (
    <div className="flex w-full">
      {aiRecommendSteps.map(({ name }, idx) => (
        <TabButton
          key={`tab-${idx}`}
          active={currentStepIdx === idx}
          disabled={isTabButtonDisabled(idx)}
          onClick={() => onTabClick(idx)}
        >
          {name}
        </TabButton>
      ))}
    </div>
  );
};

const getCurrentStepData = (
  stepIdx: number,
  {
    subwayLineData,
    subwayStationData,
    themeData,
    aiRecommendCourseData,
  }: {
    subwayLineData?: any;
    subwayStationData?: any;
    themeData?: any;
    aiRecommendCourseData?: any;
  },
) => {
  switch (stepIdx) {
    case 0: // Subway step
      return {
        lineData: subwayLineData?.data,
        stationData: subwayStationData?.data,
      };
    case 1: // Theme step
      return {
        themeData: themeData?.data,
      };
    case 2: // Custom step
      return {
        aiRecommendCourseData: aiRecommendCourseData?.data,
      };
    default:
      return undefined;
  }
};
