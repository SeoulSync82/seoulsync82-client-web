import { useLocation } from 'react-router';
import Chip from '@/components/chip/Chip';

interface SelectThemeViewProps {
  themeData: any;
  onClickTheme: (item: any) => void;
  onClickCancelTheme: () => void;
}
export default function SelectThemeView({
  themeData,
  onClickTheme,
  onClickCancelTheme,
}: SelectThemeViewProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const theme_uuid = searchParams.get('theme_uuid');
  const selectedThemeName = themeData?.data.items.find(
    (item) => item.uuid === theme_uuid,
  )?.theme_name;

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="flex flex-col">
        {theme_uuid && (
          <div className="flex h-fit w-full flex-col">
            <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
              내가 선택한 테마
            </div>
            <div className="ml-5 flex flex-row flex-wrap gap-2">
              {theme_uuid && (
                <Chip
                  size={'medium'}
                  active={!!theme_uuid}
                  content={selectedThemeName}
                  onClickCancel={onClickCancelTheme}
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
                active={item.uuid === theme_uuid}
                onClick={() => onClickTheme(item)}
                onClickCancel={onClickCancelTheme}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
