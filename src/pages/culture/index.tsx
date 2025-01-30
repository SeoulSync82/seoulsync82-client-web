import TabButton from '@/components/buttons/tab';
import CulturePlaceItem from '@/components/pages/culture/CulturePlaceItem';
import { usePlaceExhibition, usePlacePopup } from '@/service/place/usePlaceService';
import { convertDateToYMD } from '@/utils';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

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

export default function Culture() {
  const tabItems = [
    {
      label: '전시',
      type: 'exhibitions',
    },
    {
      label: '팝업',
      type: 'popups',
    },
  ];
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const type = searchParams.get('type');
  const order = searchParams.get('order') ?? 'latest';
  const navigate = useNavigate();

  const sortTypes = [
    {
      type: 'latest',
      label: '최근순',
    },
    {
      type: 'deadline',
      label: '마감임박순',
    },
  ];

  const { data: exhibitionData } = usePlaceExhibition(10, 0, order as SortCultureOrder);
  const { data: popupData } = usePlacePopup(10, 0, order as SortCultureOrder);
  const cultureData = type === 'exhibitions' ? exhibitionData : popupData;

  const updateQueryParam = (key: string, value: string) => {
    searchParams.set(key, value);
    navigate({
      pathname,
      search: `?${searchParams.toString()}`,
    });
  };
  const onClickSort = (type: SortCultureOrder) => {
    updateQueryParam('order', type);
  };

  useEffect(() => {
    if (!type || !order) {
      updateQueryParam('type', 'exhibitions');
      updateQueryParam('order', 'latest');
    }
  }, []);

  return (
    <div className="page w-full">
      <div className="flex w-full">
        {tabItems.map((item, idx) => (
          <TabButton
            key={`tab-${idx}`}
            title={item.label}
            active={type === item.type}
            href={`${pathname}?type=${item.type}`}
            className={clsx('flex-1')}
          />
        ))}
      </div>
      <div className="flex h-[46px] w-full items-center justify-between px-[20px]">
        <div className="text-14 font-medium text-gray-500">
          <span className="font-bold">{cultureData?.data?.items.length}</span>개의 장소
        </div>
        <div className="flex items-center">
          {sortTypes.map((item, idx) => (
            <button
              key={`sort-${idx}`}
              onClick={() => onClickSort(item.type as SortCultureOrder)}
              className={clsx(
                'text-14',
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
        <div className="overflow-y-hidden pb-[86px]">
          {cultureData?.data.items.map((item: ExhibitionItem & PopupItem) => (
            <CulturePlaceItem key={`culture-${item.uuid}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
