import Chip from '@/components/Chip';
import { useBoundStore } from '@/stores';

interface SelectThemeStepProps {
  data: {
    themeData: any;
  };
}

const SelectThemeStep = ({ data }: SelectThemeStepProps) => {
  const { customCourseData, setCustomCourseData } = useBoundStore((state) => state);
  const selectedThemeName = data?.themeData?.items?.find(
    (item: any) => item.uuid === customCourseData.themeUuid,
  )?.theme_name;

  console.log(333, data?.themeData);
  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="flex flex-col">
        {customCourseData.themeUuid && (
          <div className="flex h-fit w-full flex-col">
            <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
              내가 선택한 테마
            </div>
            <div className="ml-5 flex flex-row flex-wrap gap-2">
              {customCourseData.themeUuid && (
                <Chip
                  size={'medium'}
                  active={!!customCourseData.themeUuid}
                  content={selectedThemeName}
                  onClickCancel={() => setCustomCourseData({ ...customCourseData, themeUuid: '' })}
                />
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
              <Chip
                size="medium"
                content={item.theme_name}
                key={item.uuid}
                active={item.uuid === customCourseData.themeUuid}
                onClick={() => setCustomCourseData({ ...customCourseData, themeUuid: item.uuid })}
                onClickCancel={() => setCustomCourseData({ ...customCourseData, themeUuid: '' })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectThemeStep;