import { SelectStationButton } from '@/components/Button';
import { SelectSubwayButton } from '@/components/Button';
import useCourseStore from '@/stores/courseSlice';
import { AxiosResponse } from 'axios';

interface SelectSubwayStepProps {
  data: {
    lineData: AxiosResponse<{ items: { uuid: string; line: string }[] }> | undefined;
    stationData: AxiosResponse<{ items: { uuid: string; station: string }[] }> | undefined;
  };
}

const SelectSubwayStep = ({ data }: SelectSubwayStepProps) => {
  const customCourseData = useCourseStore((state) => state.customCourseData);
  const setCustomCourseData = useCourseStore((state) => state.setCustomCourseData);

  const handleSelectSubwayLine = (lineUuid: string) => {
    setCustomCourseData({
      ...customCourseData,
      lineUuid,
      stationUuid: '',
    });
  };

  const handleSelectSubwayStation = (stationUuid: string) => {
    setCustomCourseData({
      ...customCourseData,
      stationUuid,
    });
  };

  console.log(data);

  return (
    <div className="flex w-full">
      <div className="hide-scroll flex h-[calc(100vh-164px)] basis-1/3 flex-col overflow-y-auto">
        {data?.lineData?.items?.map((item) => (
          <SelectSubwayButton
            key={item.uuid}
            active={customCourseData.lineUuid === item.uuid}
            onClick={() => handleSelectSubwayLine(item.uuid)}
          >
            {item.line}
          </SelectSubwayButton>
        ))}
      </div>
      <div className="hide-scroll flex h-[calc(100vh-164px)] basis-2/3 flex-col overflow-y-auto">
        {data?.stationData?.items?.map((item) => (
          <SelectStationButton
            key={item.uuid}
            active={customCourseData.stationUuid === item.uuid}
            onClick={() => handleSelectSubwayStation(item.uuid)}
          >
            {item.station}
          </SelectStationButton>
        ))}
      </div>
    </div>
  );
};

export default SelectSubwayStep;
