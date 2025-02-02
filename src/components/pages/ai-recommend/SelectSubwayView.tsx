import SelectStationButton from '@/components/buttons/select-station/SelecStationButton';
import SelectSubwayButton from '@/components/buttons/select-subway/SelectSubwayButton';
import { AxiosResponse } from 'axios';
import { useLocation } from 'react-router';

interface SelectSubwayViewProps {
  subwayLineData: AxiosResponse<any> | undefined;
  subwayStationData: AxiosResponse<any> | undefined;
  onClickSubwayLine: (item: any) => void;
  onClickSubwayStation: (item: any) => void;
}

export default function SelectSubwayView({
  subwayLineData,
  subwayStationData,
  onClickSubwayLine,
  onClickSubwayStation,
}: SelectSubwayViewProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const line_uuid = searchParams.get('line_uuid');
  const station_uuid = searchParams.get('station_uuid');
  
  const isActiveSubwayLine = (item: any) => line_uuid === item.uuid;
  const isActiveSubwayStation = (item: any) => station_uuid === item.uuid;

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="hide-scroll flex grow basis-1/3 flex-col overflow-y-auto bg-gray-100">
        {subwayLineData?.data?.items.map((item) => (
          <SelectSubwayButton
            key={item.uuid}
            content={item.line}
            textColor={isActiveSubwayLine(item) ? 'primary' : 'gray400'}
            isActive={isActiveSubwayLine(item)}
            onClick={() => onClickSubwayLine(item)}
          />
        ))}
      </div>
      <div className="hide-scroll flex grow basis-2/3 flex-col overflow-y-auto">
        {subwayStationData?.data?.items.map((item) => (
          <SelectStationButton
            key={item.station_uuid}
            content={item.station}
            bgColor={isActiveSubwayStation(item) ? 'primary' : 'white'}
            textColor={isActiveSubwayStation(item) ? 'white' : 'gray400'}
            isActive={isActiveSubwayStation(item)}
            onClick={() => onClickSubwayStation(item)}
            className="border-b border-gray-200 text-16 font-normal"
          />
        ))}
      </div>
    </div>
  );
}
