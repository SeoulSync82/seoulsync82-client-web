import Image from '@/components/Image';
import { ExhibitionItem, PopupItem } from '@/pages/CulturePage';
import { convertDateToYMD } from '@/utils';
import { Link } from 'react-router';

export default function CulturePlaceItem(props: ExhibitionItem & PopupItem) {
  const {
    place_name,
    thumbnail,
    top_level_address,
    start_date,
    end_date,
    place_type,
    uuid,
    entrance_fee = '',
  } = props;

  return (
    <Link
      to={`/culture/${place_type === '전시' ? 'exhibition' : 'popup'}/${uuid}`}
      className="flex w-full px-5"
    >
      <div className="border-b-1 flex w-full items-center gap-5 border-gray-200 py-[10px]">
        <Image
          src={thumbnail}
          className="aspect-[3/4] rounded-md object-cover"
          width={90}
          alt={place_name}
          fallbackWidth={40}
          fallbackHeight={40}
        />
        <div className="flex-1">
          <h2 className="text-base font-bold leading-6">{place_name}</h2>
          <div className="mt-1 text-sm font-medium leading-none text-gray-300">
            {`${top_level_address} · ${entrance_fee}${place_type}`}
          </div>
          <div className="mt-2.5 text-sm font-semibold leading-none text-gray-400">리움미술관</div>
          <div className="mt-1 text-sm font-medium leading-none text-gray-400">
            {convertDateToYMD(start_date)} ~ {convertDateToYMD(end_date)}
          </div>
        </div>
      </div>
    </Link>
  );
}
