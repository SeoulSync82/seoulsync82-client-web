import Chip from '@/components/Chip';
import { useBoundStore } from '@/stores';

interface SelectThemeViewProps {
  themeData: any;
}
export default function SelectThemeView({ themeData }: SelectThemeViewProps) {
  const { themeUuid, setThemeUuid } = useBoundStore((state) => state);
  const selectedThemeName = themeData?.data.items.find(
    (item) => item.uuid === themeUuid,
  )?.theme_name;

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="flex flex-col">
        {themeUuid && (
          <div className="flex h-fit w-full flex-col">
            <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
              내가 선택한 테마
            </div>
            <div className="ml-5 flex flex-row flex-wrap gap-2">
              {themeUuid && (
                <Chip
                  size={'medium'}
                  active={!!themeUuid}
                  content={selectedThemeName}
                  onClickCancel={() => setThemeUuid('')}
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
            {themeData?.data.items.map((item: any) => (
              <Chip
                size="medium"
                content={item.theme_name}
                key={item.uuid}
                active={item.uuid === themeUuid}
                onClick={() => setThemeUuid(item.uuid)}
                onClickCancel={() => setThemeUuid('')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
