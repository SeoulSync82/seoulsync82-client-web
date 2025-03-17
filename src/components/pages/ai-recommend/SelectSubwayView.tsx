import { SelectStationButton } from '@/components/Button';
import { SelectSubwayButton } from '@/components/Button';
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
      <div className="hide-scroll flex basis-1/3 flex-col overflow-y-auto bg-gray-100">
        {subwayLineData?.data?.items.map((item) => (
          <SelectSubwayButton
            key={item.uuid}
            active={lineUuid === item.uuid}
            onClick={() => onClickSubwayLine(item)}
          >
            {item.line}
          </SelectSubwayButton>
        ))}
      </div>
      <div className="hide-scroll flex basis-2/3 flex-col overflow-y-auto">
        {subwayStationData?.data?.items.map((item) => (
          <SelectStationButton
            key={item.station_uuid}
            active={stationUuid === item.uuid}
            onClick={() => onClickSubwayStation(item)}
          >
            {item.station}
          </SelectStationButton>
        ))}
      </div>
    </div>
  );
}
