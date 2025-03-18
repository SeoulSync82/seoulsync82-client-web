import { SelectStationButton } from '@/components/Button';
import { SelectSubwayButton } from '@/components/Button';
import { useBoundStore } from '@/stores';
import { AxiosResponse } from 'axios';

interface SelectSubwayStepProps {
  data: {
    lineData: AxiosResponse<any> | undefined;
    stationData: AxiosResponse<any> | undefined;
  };
}

const SelectSubwayStep = ({ data }: SelectSubwayStepProps) => {
  const { customCourseData, setCustomCourseData } = useBoundStore((state) => state);

  const onClickSubwayLine = (item: any) => {
    setCustomCourseData({
      ...customCourseData,
      lineUuid: item.uuid,
      stationUuid: '',
    });
  };
  const onClickSubwayStation = (item: any) => {
    setCustomCourseData({
      ...customCourseData,
      stationUuid: item.uuid,
    });
  };

  return (
    <div className="flex w-full">
      <div className="hide-scroll flex basis-1/3 flex-col overflow-y-auto">
        {data?.lineData?.items?.map((item: any) => (
          <SelectSubwayButton
            key={item.uuid}
            active={customCourseData.lineUuid === item.uuid}
            onClick={() => onClickSubwayLine(item)}
          >
            {item.line}
          </SelectSubwayButton>
        ))}
      </div>
      <div className="hide-scroll flex basis-2/3 flex-col overflow-y-auto">
        {data?.stationData?.items?.map((item: any) => (
          <SelectStationButton
            key={item.uuid}
            active={customCourseData.stationUuid === item.uuid}
            onClick={() => onClickSubwayStation(item)}
          >
            {item.station}
          </SelectStationButton>
        ))}
      </div>
    </div>
  );
};
export default SelectSubwayStep;