import { useEffect, useState } from 'react';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useThemesList } from '@/service/theme/useThemeService';
import { BottomButton } from '@/components/Button';
import SelectSubwayStep from '@/components/pages/ai-recommend/SelectSubwayStep';
import SelectThemeStep from '@/components/pages/ai-recommend/SelectThemeStep';
import CustomCourseStep from '@/components/pages/ai-recommend/custom-course-step/CustomCourseStep';
import { useAiCourseRecommend, useSaveRecommendCourse } from '@/service/course/useCourseService';
import TabButton from '@/components/TabButtonGroup/TabButton';
import useCourseStore from '@/stores/courseSlice';

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

const AiRecommendPage = () => {
  const customCourseData = useCourseStore((state) => state.customCourseData);
  const resetCustomCourseData = useCourseStore((state) => state.resetCustomCourseData);

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const { data: subwayLineData } = useSubwayLines();
  const { data: subwayStationData } = useSubwayStations(
    customCourseData.subwayData.lineUuid as string,
    {
      enabled: !!customCourseData.subwayData.lineUuid,
    },
  );
  const { data: themeData } = useThemesList();
  const { data: aiRecommendCourseData } = useAiCourseRecommend(
    customCourseData.subwayData.stationUuid,
    customCourseData.subwayData.themeUuid !== THEME_UUID_OVER_THREE_POINT_FIVE_STARS
      ? customCourseData.subwayData.themeUuid
      : '',
    '', // placeType 제거됨
    {
      enabled: !!customCourseData.subwayData.stationUuid && !!customCourseData.subwayData.themeUuid,
    },
  );

  const { mutate: saveAiRecommendCourse } = useSaveRecommendCourse();

  const isBottomButtonDisabled =
    (currentStepIdx === 0 &&
      (!customCourseData.subwayData.lineUuid || !customCourseData.subwayData.stationUuid)) ||
    (currentStepIdx === 1 &&
      (!customCourseData.subwayData.lineUuid ||
        !customCourseData.subwayData.stationUuid ||
        !customCourseData.subwayData.themeUuid)) ||
    (currentStepIdx === 2 && customCourseData.courseData.places.length < 3);

  const onClickBottomButton = async () => {
    if (currentStepIdx === 2) {
      // Custom step
      if (customCourseData.courseData.places.length < 3) {
        alert('toast: 3개 이상의 장소를 추가해주세요.');
        return;
      }
      const data = {
        station_uuid: customCourseData.subwayData.stationUuid,
        theme_uuid: customCourseData.subwayData.themeUuid,
        course_uuid: customCourseData.courseData.uuid,
        course_name: customCourseData.courseData.name,
        places: customCourseData.courseData.places,
      };
      await saveAiRecommendCourse(data);
      window.location.href = `/course/my-course/${customCourseData.courseData.uuid}`;
      resetCustomCourseData();
      return;
    }
    setCurrentStepIdx((prev) => prev + 1);
  };

  const CurrentStepView = aiRecommendSteps[currentStepIdx].component;
  const currentStepData = getCurrentStepData(currentStepIdx, {
    subwayLineData,
    subwayStationData,
    themeData,
    aiRecommendCourseData,
  });

  useEffect(() => {
    return () => {
      resetCustomCourseData();
    };
  }, []);

  return (
    <>
      <StepButtonGroup
        currentStepIdx={currentStepIdx}
        onStepClick={(idx) => {
          if (idx <= currentStepIdx) {
            setCurrentStepIdx(idx);
          }
        }}
      />
      <CurrentStepView data={currentStepData as any} /> {/* TODO: 타입 정의 필요 */}
      <BottomButton disabled={isBottomButtonDisabled} onClick={onClickBottomButton}>
        {currentStepIdx === 2 ? '완료' : '선택하기'}
      </BottomButton>
    </>
  );
};

export default AiRecommendPage;

const StepButtonGroup = ({
  currentStepIdx,
  onStepClick,
}: {
  currentStepIdx: number;
  onStepClick: (idx: number) => void;
}) => {
  const isTabButtonDisabled = (idx: number) => idx > currentStepIdx;
  return (
    <div className="flex w-full">
      {aiRecommendSteps.map(({ name }, idx) => (
        <TabButton
          key={`tab-${idx}`}
          active={currentStepIdx === idx}
          disabled={isTabButtonDisabled(idx)}
          onClick={() => onStepClick(idx)}
        >
          {name}
        </TabButton>
      ))}
    </div>
  );
};

const getCurrentStepData = (
  stepIdx: number,
  stepData: {
    subwayLineData?: any;
    subwayStationData?: any;
    themeData?: any;
    aiRecommendCourseData?: any;
  },
) => {
  const { subwayLineData, subwayStationData, themeData, aiRecommendCourseData } = stepData;

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
