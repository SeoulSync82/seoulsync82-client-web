import { ChipButton } from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router';

enum CustomPlaceTypes {
  RESTAURANT = '음식점',
  CAFE = '카페',
  BAR = '술집',
  SHOPPING = '쇼핑',
  CULTURE = '문화',
  ENTERTAINMENT = '놀거리',
  EXHIBITION = '전시',
  POPUP = '팝업',
}

interface CustomPlaceItemProps {
  place: any;
  onDelete?: (uuid: string) => void;
  idx: number;
}

const CustomPlaceItem = ({ place, onDelete, idx }: CustomPlaceItemProps) => {
  const CustomPlaceHeader = () => {
    return (
      <div className="flex w-full items-center justify-between pl-4">
        <div className="text-14 font-normal text-gray-300">
          {CustomPlaceTypes[place.place_type as keyof typeof CustomPlaceTypes]}
        </div>
        {onDelete && <ChipButton onClick={() => onDelete(place.uuid)}>삭제</ChipButton>}
      </div>
    );
  };

  const CustomPlaceContent = () => {
    return (
      <Accordion type="multiple" defaultValue={[place.uuid]} className="w-full">
        <AccordionItem value={place.uuid}>
          <AccordionTrigger>{place.place_name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex w-full items-center gap-[10px] rounded-lg bg-gray-50 p-4">
              <img
                src={place.thumbnail}
                alt={place.place_name}
                className="size-[68px] min-w-[68px] rounded-lg object-cover"
              />
              <div className="flex w-full items-center justify-between gap-[22px]">
                <div>
                  <div className="line-clamp-2 break-all text-14 font-normal leading-[18px] text-gray-500">
                    {place.address}
                  </div>
                  <div className="mt-2 flex items-center">
                    <Link
                      to={`/map?latitude=${place.latitude}&longitude=${place.longitude}`}
                      target="_blank"
                      className="text-12 font-bold text-primary-500"
                    >
                      지도보기
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <SvgIcon name="FullStar" width={14} height={14} />
                  <span className="text-12 font-normal text-gray-900">{place.score}</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <div className="mb-4 flex min-h-[70px] w-full items-start">
      <div className="flex w-full">
        <CustomPlaceFlag number={idx + 1} />
        <div className="flex w-full flex-col items-center justify-start">
          <CustomPlaceHeader />
          <CustomPlaceContent />
        </div>
      </div>
    </div>
  );
};
export default CustomPlaceItem;

const CustomPlaceFlag = ({ number }: { number: number }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-fit w-fit">
        <SvgIcon name="Line" width={33} height={33} active={false} />
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-2 text-10 text-white">
          {number}
        </div>
      </div>
      <hr className="mt-1 h-full w-0 border-[1px] border-dashed" />
    </div>
  );
};
