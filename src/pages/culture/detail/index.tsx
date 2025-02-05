import NaverMap from '@/components/map/NaverMap';
import { usePlaceDetail } from '@/service/place/usePlaceService';
import { convertDateToYMD } from '@/utils';
import { useParams } from 'react-router';

export default function CultureDetail() {
  const { type, id } = useParams();
  console.log(123, type, id);

  const { data } = usePlaceDetail(id as string);
  console.log(123, data?.data);

  return (
    <div className="page w-full">
      <div className="relative w-full">
        <img className="aspect-[2/1] w-full object-cover" src={data?.data?.thumbnail} />
        <div className="absolute bottom-[16px] right-[20px] flex h-[25px] w-fit items-center rounded-[100px] bg-[rgba(0,0,0,0.5)] px-[16px] text-14 font-medium text-white">
          {data?.data?.top_level_address} · {data?.data?.place_type}
        </div>
      </div>
      <div className="mt-[20px] w-full px-[20px] text-20 font-bold leading-[28px]">
        {data?.data?.place_name}
      </div>
      <div className="mt-[20px] w-full px-[20px]">
        <ul className="grid w-[75%] gap-[10px]">
          <li className="flex w-full items-start gap-[8px] text-14 font-medium leading-[20px]">
            <div className="min-w-[25px] text-gray-400">기간</div>
            <div className="text-gray-900">
              {convertDateToYMD(data?.data?.start_date)} ~ {convertDateToYMD(data?.data?.end_date)}
            </div>
          </li>
          {data?.data?.closed_days && (
            <li className="flex w-full items-start gap-[8px] text-14 font-medium leading-[20px]">
              <div className="min-w-[25px] text-gray-400">휴관</div>
              <div className="text-gray-900">{data?.data?.closed_days}</div>
            </li>
          )}
          <li className="flex w-full items-start gap-[8px] text-14 font-medium leading-[20px]">
            <div className="min-w-[25px] text-gray-400">장소</div>
            <div className="line-clamp-2 break-all text-gray-900">{data?.data?.address}</div>
          </li>
        </ul>
      </div>
      <div className="mt-[40px] w-full">
        <div className="px-[20px] text-20 font-bold">공간 정보</div>
        {/* TODO: 공간정보 위도, 경도 필요 */}
        <NaverMap
          className="mt-[20px]"
          height={'50dvh'}
          latitude={data?.data?.latitude}
          longitude={data?.data?.longitude}
        />
      </div>
    </div>
  );
}
