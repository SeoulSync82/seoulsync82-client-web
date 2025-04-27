import { cn } from '@/utils/tailwindcss';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { usePlaceExhibition, usePlacePopup } from '@/service/place/usePlaceService';
import { TabButton } from '@/components/Button';
import CulturePlaceItem from '@/components/pages/culture/CulturePlaceItem';

interface CultureItem {
  address: string;
  end_date: string;
  place_name: string;
  place_type: string;
  start_date: string;
  thumbnail: string;
  top_level_address: string;
  uuid: string;
}
export interface PopupItem extends CultureItem {}
export interface ExhibitionItem extends CultureItem {
  closed_days: string;
  entrance_fee: string;
  operation_time: string;
}
export type SortCultureOrder = 'latest' | 'deadline';

const tabItems = [
  { label: '전시', type: 'exhibitions' },
  { label: '팝업', type: 'popups' },
];

const sortTypes = [
  { type: 'latest', label: '최근순' },
  { type: 'deadline', label: '마감임박순' },
];

const Culture = () => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const type = searchParams.get('type');
  const order = searchParams.get('order') ?? 'latest';
  const navigate = useNavigate();

  const { data: exhibitionData } = usePlaceExhibition(10, 0, order as SortCultureOrder);
  const { data: popupData } = usePlacePopup(10, 0, order as SortCultureOrder);
  const cultureData = type === 'exhibitions' ? exhibitionData : popupData;

  const updateQueryParam = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate({ pathname, search: `?${searchParams.toString()}` });
  };

  const handleSortClick = (type: SortCultureOrder) => updateQueryParam('order', type);

  useEffect(() => {
    if (!type || !order) {
      updateQueryParam('type', 'exhibitions');
      updateQueryParam('order', 'latest');
    }
  }, [type, order]);

  return (
    <div className="page">
      <div className="flex w-full">
        {tabItems.map((item, idx) => (
          <TabButton
            key={`tab-${idx}`}
            active={type === item.type}
            onClick={() => updateQueryParam('type', item.type)}
            className={cn('flex-1')}
          >
            {item.label}
          </TabButton>
        ))}
      </div>
      <div className="flex h-12 w-full items-center justify-between px-5">
        <div className="text-sm font-medium text-gray-500">
          <span className="font-bold">{cultureData?.data?.total_count}</span>개의 장소
        </div>
        <div className="flex items-center">
          {sortTypes.map((item, idx) => (
            <button
              key={`sort-${idx}`}
              onClick={() => handleSortClick(item.type as SortCultureOrder)}
              className={cn(
                'text-sm',
                item.type === order ? 'font-bold text-primary-500' : 'font-medium text-gray-300',
                idx === 0 ? 'mr-[10px]' : 'border-l-[1px] border-gray-200 pl-[10px]',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[calc(100dvh-238px)] w-full overflow-y-scroll">
        <div className="overflow-y-hidden">
          {cultureData?.data.items.map((item: ExhibitionItem & PopupItem) => (
            <CulturePlaceItem key={`culture-${item.uuid}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Culture;
