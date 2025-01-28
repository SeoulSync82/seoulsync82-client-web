import Chip from '@/components/chip/Chip';
import { useThemesList } from '@/service/theme/useThemeService';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function SelectThemeView() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const theme_uuid = searchParams.get('theme_uuid');

  const [selectedTheme, setSelectedTheme] = useState(theme_uuid);

  const { data: themeData } = useThemesList();

  useEffect(() => {
    const theme = themeData?.data.items.find((v) => v.uuid === theme_uuid);
    setSelectedTheme(theme);
  }, [theme_uuid]);

  const updateQueryParam = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };
  const deleteQueryParam = (key: string) => {
    searchParams.delete(key);
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  const onClickTheme = (item: any) => {
    updateQueryParam('theme_uuid', item.uuid);
    setSelectedTheme(item);
  };
  const onClickCancelTheme = () => {
    deleteQueryParam('theme_uuid');
    setSelectedTheme(null);
  };

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="flex flex-col">
        {selectedTheme && (
          <div className="flex h-fit w-full flex-col">
            <div className="font ml-5 flex h-[60px] items-center text-16 font-semibold">
              내가 선택한 테마
            </div>
            <div className="ml-5 flex flex-row flex-wrap gap-2">
              {selectedTheme && (
                <Chip
                  size={'medium'}
                  active={true}
                  content={selectedTheme?.theme_name}
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
            {themeData?.data.items.map((item) => (
              <Chip
                size="medium"
                content={item.theme_name}
                key={item.uuid}
                active={item.theme_name === selectedTheme?.theme_name}
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
