import { CapsuleButton } from '@/components/Button';
import useCourseStore from '@/stores/courseSlice';

export interface SelectThemeStepProps {
  data: {
    themeData: any;
  };
}

const SelectThemeStep = ({ data }: SelectThemeStepProps) => {
  const customCourseData = useCourseStore((state) => state.customCourseData);
  const setCustomCourseData = useCourseStore((state) => state.setCustomCourseData);

  const selectedThemeName = data?.themeData?.items?.find(
    (item: any) => item.uuid === customCourseData.subwayData.themeUuid,
  )?.theme_name;

  return (
    <div className="flex flex-col">
      {customCourseData.subwayData.themeUuid && (
        <div className="flex h-fit w-full flex-col">
          <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
            내가 선택한 테마
          </div>
          <div className="ml-5 flex flex-row flex-wrap gap-2">
            {customCourseData.subwayData.themeUuid && (
              <CapsuleButton
                active={!!customCourseData.subwayData.themeUuid}
                onClickCancel={() =>
                  setCustomCourseData({
                    subwayData: { ...customCourseData.subwayData, themeUuid: '' },
                  })
                }
              >
                {selectedThemeName}
              </CapsuleButton>
            )}
          </div>
        </div>
      )}
      <div className="h-fit w-full flex-col">
        <div className="ml-5 flex h-[60px] items-center text-16 font-semibold">테마 선택하기</div>
        <div className="ml-5 flex flex-row flex-wrap gap-2">
          {data?.themeData?.items?.map((item: any) => (
            <CapsuleButton
              key={item.uuid}
              active={item.uuid === customCourseData.subwayData.themeUuid}
              onClick={() =>
                setCustomCourseData({
                  subwayData: { ...customCourseData.subwayData, themeUuid: item.uuid },
                })
              }
              onClickCancel={() =>
                setCustomCourseData({
                  subwayData: { ...customCourseData.subwayData, themeUuid: '' },
                })
              }
            >
              {item.theme_name}
            </CapsuleButton>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SelectThemeStep;
