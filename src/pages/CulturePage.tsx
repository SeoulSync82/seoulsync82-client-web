import { cn } from '@/utils/tailwindcss';
import { useEffect } from 'react';
import { usePlaceExhibition, usePlacePopup } from '@/service/place/usePlaceService';
import CulturePlaceItem from '@/components/pages/culture/CulturePlaceItem';
import TabButtonGroup from '@/components/TabButtonGroup';
import { useQueryParams } from '@/hooks/useQueryParams';

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

const useCultureData = (order: SortCultureOrder, type: string | null) => {
  const { data: exhibitionData } = usePlaceExhibition(10, 0, order);
  const { data: popupData } = usePlacePopup(10, 0, order);
  return type === 'exhibitions' ? exhibitionData : popupData;
};

const CulturePage = () => {
  const { searchParams, updateQueryParam } = useQueryParams();
  const type = searchParams.get('type');
  const order = searchParams.get('order') ?? 'latest';

  const cultureData = useCultureData(order as SortCultureOrder, type);

  useEffect(() => {
    if (!type || !order) {
      updateQueryParam('type', 'exhibitions');
      updateQueryParam('order', 'latest');
    }
  }, [type, order, updateQueryParam]);

  const handleTabClick = (tabType: string) => {
    updateQueryParam('type', tabType);
  };
  const handleSortClick = (sortType: SortCultureOrder) => {
    updateQueryParam('order', sortType);
  };

  return (
    <div className="page">
      <TabButtonGroup tabType={type as string} onClickTab={handleTabClick} tabItems={tabItems} />
      <SortOptions
        sortType={order as SortCultureOrder}
        totalCount={cultureData?.data?.total_count}
        handleSortClick={handleSortClick}
      />
      <CultureList cultureData={cultureData?.data} />
    </div>
  );
};

const SortOptions = ({
  totalCount,
  sortType,
  handleSortClick,
}: {
  totalCount: number;
  sortType: SortCultureOrder;
  handleSortClick: (sortType: SortCultureOrder) => void;
}) => (
  <div className="flex h-12 w-full items-center justify-between px-5">
    <div className="text-sm font-medium text-gray-500">
      <span className="font-bold">{totalCount}</span>개의 장소
    </div>
    <div className="flex items-center">
      {sortTypes.map((item, idx) => (
        <button
          key={`sort-${idx}`}
          onClick={() => handleSortClick(item.type as SortCultureOrder)}
          className={cn(
            'text-sm',
            item.type === sortType ? 'font-bold text-primary-500' : 'font-medium text-gray-300',
            idx === 0 ? 'mr-[10px]' : 'border-l-[1px] border-gray-200 pl-[10px]',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

const CultureList = ({
  cultureData,
}: {
  cultureData: { items: (ExhibitionItem & PopupItem)[] };
}) => (
  <div className="h-[calc(100dvh-238px)] w-full overflow-y-scroll">
    <div className="overflow-y-hidden">
      {cultureData?.items.map((item: ExhibitionItem & PopupItem) => (
        <CulturePlaceItem key={`culture-${item.uuid}`} {...item} />
      ))}
    </div>
  </div>
);

export default CulturePage;