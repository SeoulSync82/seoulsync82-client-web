import { PlaceItem } from '@/service/place/types';
import { usePlaceCulture } from '@/service/place/usePlaceService';
import { convertDateToYMD } from '@/utils';
import { Link } from 'react-router';

export default function Home() {
  const { data } = usePlaceCulture();

  return (
    <div className="page">
      <div className="flex h-[60px] w-full items-center justify-between px-[20px]">
        <h2 className="text-[20px] font-bold text-black">주목해야할 전시 · 팝업</h2>
        <Link to="/" className="text-[14px] font-bold text-primary-500">
          더보기
        </Link>
      </div>
      <div className="w-full overflow-x-hidden">
        <div className="flex w-full gap-[20px] overflow-x-auto px-[20px]">
          {data?.data?.items?.map((item: PlaceItem, idx: number) => (
            <div
              style={{
                background: `
                linear-gradient(180deg, rgba(63, 63, 63, 0) 43.43%, rgba(63, 63, 63, 0) 100%), 
                url(${item.thumbnail})
              `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="flex h-[320px] min-w-[242px] flex-col gap-[20px] rounded-[8px] bg-cover bg-center"
              key={idx}
            >
              <div className="w-full">{item?.place_name}</div>
              <div className="w-full">
                <div>{item?.address}</div>
                <div>
                  {convertDateToYMD(item?.start_date)} - {convertDateToYMD(item?.end_date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
