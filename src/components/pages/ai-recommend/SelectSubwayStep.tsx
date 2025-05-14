import { SelectStationButton } from '@/components/Button';
import { SelectSubwayButton } from '@/components/Button';
import useCourseStore from '@/stores/courseSlice';

export interface SelectSubwayStepProps {
  data: {
    lineData: { items: { uuid: string; line: string }[] };
    stationData: { items: { uuid: string; station: string }[] };
  };
}

const SelectSubwayStep = ({ data }: SelectSubwayStepProps) => {
  const customCourseData = useCourseStore((state) => state.customCourseData);
  const setCustomCourseData = useCourseStore((state) => state.setCustomCourseData);

  const handleSelectSubwayLine = (lineUuid: string) => {
    setCustomCourseData({
      subwayData: {
        ...customCourseData.subwayData,
        lineUuid,
        stationUuid: '',
      },
    });
  };

  const handleSelectSubwayStation = (stationUuid: string) => {
    setCustomCourseData({
      subwayData: {
        ...customCourseData.subwayData,
        stationUuid,
      },
    });
  };

  console.log(data);

  return (
    <div className="flex w-full">
      <div className="hide-scroll flex h-[calc(100vh-164px)] basis-1/3 flex-col overflow-y-auto">
        {data?.lineData?.items?.map((item) => (
          <SelectSubwayButton
            key={item.uuid}
            active={customCourseData.subwayData.lineUuid === item.uuid}
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
            active={customCourseData.subwayData.stationUuid === item.uuid}
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
