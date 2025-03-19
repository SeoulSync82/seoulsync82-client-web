import { CapsuleButton } from '@/components/Button';
import { useBoundStore } from '@/stores';

interface SelectThemeStepProps {
  data: {
    themeData: any;
  };
}

const SelectThemeStep = ({ data }: SelectThemeStepProps) => {
  const customCourseData = useBoundStore((state) => state.customCourseData);
  const setCustomCourseData = useBoundStore((state) => state.setCustomCourseData);

  const selectedThemeName = data?.themeData?.items?.find(
    (item: any) => item.uuid === customCourseData.themeUuid,
  )?.theme_name;

  return (
    <div className="flex flex-col">
      {customCourseData.themeUuid && (
        <div className="flex h-fit w-full flex-col">
          <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
            내가 선택한 테마
          </div>
          <div className="ml-5 flex flex-row flex-wrap gap-2">
            {customCourseData.themeUuid && (
              <CapsuleButton
                active={!!customCourseData.themeUuid}
                onClickCancel={() => setCustomCourseData({ ...customCourseData, themeUuid: '' })}
              >
                {selectedThemeName}
              </CapsuleButton>
            )}
          </div>
        </div>
      )}
      <div className="h-[60px] h-fit w-full flex-col">
        <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
          테마 선택하기
        </div>
        <div className="ml-5 flex flex-row flex-wrap gap-2">
          {data?.themeData?.items?.map((item: any) => (
            <CapsuleButton
              key={item.uuid}
              active={item.uuid === customCourseData.themeUuid}
              onClick={() => setCustomCourseData({ ...customCourseData, themeUuid: item.uuid })}
              onClickCancel={() => setCustomCourseData({ ...customCourseData, themeUuid: '' })}
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
