import SelectStationButton from '@/components/buttons/select-station/SelecStationButton';
import SelectSubwayButton from '@/components/buttons/select-subway/SelectSubwayButton';
import { useSubwayLines, useSubwayStations } from '@/service/subway/useSubwayService';
import { useLocation, useNavigate } from 'react-router';

export default function SelectSubwayView() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const line_uuid = searchParams.get('line_uuid');
  const station_uuid = searchParams.get('station_uuid');

  const { data: subwayData } = useSubwayLines();
  const { data: stationData } = useSubwayStations(line_uuid as string, {
    enabled: !!line_uuid,
  });

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

  const onClickSubwayLine = (item: any) => {
    updateQueryParam('line_uuid', item.uuid);
    deleteQueryParam('station_uuid');
  };
  const onClickSubwayStation = (item: any) => {
    updateQueryParam('station_uuid', item.uuid);
  };

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="hide-scroll flex grow basis-1/3 flex-col overflow-y-auto bg-gray-100">
        {subwayData?.data.items.map((item) => (
          <SelectSubwayButton
            key={item.uuid}
            content={item.line}
            textColor={line_uuid === item.uuid ? 'primary' : 'gray400'}
            isActive={line_uuid === item.uuid}
            onClick={() => onClickSubwayLine(item)}
          />
        ))}
      </div>
      <div className="hide-scroll flex grow basis-2/3 flex-col overflow-y-auto">
        {stationData?.data.items.map((item) => (
          <SelectStationButton
            key={item.station_uuid}
            content={item.station}
            bgColor={station_uuid === item.uuid ? 'primary' : 'white'}
            textColor={station_uuid === item.uuid ? 'white' : 'gray400'}
            isActive={station_uuid === item.uuid}
            onClick={() => onClickSubwayStation(item)}
            className="border-b border-gray-200 text-16 font-normal"
          />
        ))}
      </div>
    </div>
  );
}
