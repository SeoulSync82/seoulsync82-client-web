import Image from '@/components/Image';
import { ExhibitionItem, PopupItem } from '@/pages/CulturePage';
import { convertDateToYMD } from '@/utils';
import { Link } from 'react-router';

export default function CulturePlaceItem({
  place_name,
  thumbnail,
  top_level_address,
  start_date,
  end_date,
  place_type,
  uuid,
  entrance_fee = '',
}: ExhibitionItem & PopupItem) {
  return (
    <Link
      to={`/culture/${place_type === '전시' ? 'exhibition' : 'popup'}/${uuid}`}
      className="flex w-full px-[20px]"
    >
      <div className="flex w-full items-center gap-[20px] border-b-[1px] border-gray-200 py-[10px]">
        <Image
          src={thumbnail}
          className="h-[114px] w-[90px] rounded-md object-cover"
          width={90}
          height={114}
          alt={place_name}
          fallbackWidth={40}
          fallbackHeight={40}
        />
        <div className="flex-1">
          <h2 className="text-16 font-bold leading-[24px]">{place_name}</h2>
          <div className="mt-[4px] text-sm font-medium text-gray-300">
            {`${top_level_address} · ${entrance_fee}${place_type}`}
          </div>
          <p className="mt-[10px] text-sm font-semibold text-gray-400">리움미술관</p>
          <p className="mt-[4px] text-sm font-medium text-gray-400">
            {convertDateToYMD(start_date)} ~ {convertDateToYMD(end_date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
