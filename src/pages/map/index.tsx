import NaverMap from '@/components/map/NaverMap';
import { useQueryParams } from '@/hooks/useQueryParams';

export default function Map() {
  const { getQueryParam } = useQueryParams();
  const latitude = getQueryParam('latitude') || '';
  const longitude = getQueryParam('longitude') || '';

  return (
    <div className="h-screen w-full">
      <NaverMap height={'100dvh'} latitude={latitude} longitude={longitude} />
    </div>
  );
}
