import { forwardRef } from 'react';
import { Link } from 'react-router';
import { ChipButton } from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
  idx: number;
  onDelete?: (uuid: string, itemRef?: React.RefObject<HTMLDivElement>) => void;
}

const CustomPlaceItem = forwardRef<HTMLDivElement, CustomPlaceItemProps>(
  ({ place, idx, onDelete }, ref) => {
    const handleDelete = () => {
      onDelete?.(place.uuid, ref as React.RefObject<HTMLDivElement>);
    };

    return (
      <div ref={ref} className="mb-4 flex min-h-[70px] w-full items-start">
        <div className="flex w-full">
          <CustomPlaceFlag number={idx + 1} />
          <div className="flex w-full flex-col items-center justify-start gap-2">
            <CustomPlaceHeader placeType={place.place_type} onDelete={handleDelete} />
            <CustomPlaceContent place={place} />
          </div>
        </div>
      </div>
    );
  },
);
CustomPlaceItem.displayName = 'CustomPlaceItem';
export default CustomPlaceItem;

const CustomPlaceHeader = ({
  placeType,
  onDelete,
}: {
  placeType: string;
  onDelete?: () => void;
}) => (
  <div className="flex h-8 w-full items-center justify-between pl-4">
    <div className="text-14 font-normal text-gray-300">
      {CustomPlaceTypes[placeType as keyof typeof CustomPlaceTypes]}
    </div>
    {onDelete && <ChipButton onClick={onDelete}>삭제</ChipButton>}
  </div>
);

const CustomPlaceContent = ({ place }: { place: any }) => (
  <Accordion
    type="multiple"
    defaultValue={[place.uuid]}
    className="flex w-full items-center gap-2.5 rounded-lg"
    id="accordion"
  >
    <AccordionItem value={place.uuid} className="w-full">
      <AccordionTrigger className="rounded-lg bg-white data-[state=open]:bg-gray-50">
        {place.place_name}
      </AccordionTrigger>
      <AccordionContent className="rounded-lg bg-gray-50 p-4 pt-0">
        <PlaceDetails place={place} />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

const PlaceDetails = ({ place }: { place: any }) => (
  <div className="flex w-full items-center gap-2.5">
    <img src={place.thumbnail} alt={place.place_name} className="h-[68px] w-[68px] object-cover" />
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
);

const CustomPlaceFlag = ({ number }: { number: number }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="relative h-fit w-fit">
      <SvgIcon name="Line" width={32} height={32} active={false} />
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-2 text-10 text-white">
        {number}
      </div>
    </div>
    <hr className="mt-1 h-full w-0 border-[1px] border-dashed" />
  </div>
);
