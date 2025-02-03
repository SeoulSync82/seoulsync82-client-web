import SelectStationButton from '@/components/buttons/select-station/SelecStationButton';
import SelectSubwayButton from '@/components/buttons/select-subway/SelectSubwayButton';
import { useBoundStore } from '@/stores';
import { AxiosResponse } from 'axios';

interface SelectSubwayViewProps {
  subwayLineData: AxiosResponse<any> | undefined;
  subwayStationData: AxiosResponse<any> | undefined;
}

export default function SelectSubwayView({
  subwayLineData,
  subwayStationData,
}: SelectSubwayViewProps) {
  const { lineUuid, stationUuid, setLineUuid, setStationUuid } = useBoundStore((state) => state);

  const onClickSubwayLine = (item: any) => {
    setLineUuid(item.uuid);
    setStationUuid('');
  };
  const onClickSubwayStation = (item: any) => {
    setStationUuid(item.uuid);
  };

  return (
    <div className="flex h-[calc(100vh-162px)] w-full bg-white">
      <div className="hide-scroll flex grow basis-1/3 flex-col overflow-y-auto bg-gray-100">
        {subwayLineData?.data?.items.map((item) => (
          <SelectSubwayButton
            key={item.uuid}
            content={item.line}
            textColor={lineUuid === item.uuid ? 'primary' : 'gray400'}
            isActive={lineUuid === item.uuid}
            onClick={() => onClickSubwayLine(item)}
          />
        ))}
      </div>
      <div className="hide-scroll flex grow basis-2/3 flex-col overflow-y-auto">
        {subwayStationData?.data?.items.map((item) => (
          <SelectStationButton
            key={item.station_uuid}
            content={item.station}
            bgColor={stationUuid === item.uuid ? 'primary' : 'white'}
            textColor={stationUuid === item.uuid ? 'white' : 'gray400'}
            isActive={stationUuid === item.uuid}
            onClick={() => onClickSubwayStation(item)}
            className="border-b border-gray-200 text-16 font-normal"
          />
        ))}
      </div>
    </div>
  );
}
