import NaverMap from '@/components/map/NaverMap';
import { useQueryParams } from '@/hooks/useQueryParams';

export default function Map() {
  const { getQueryParam } = useQueryParams();
  const latitude = getQueryParam('latitude') || '';
  const longitude = getQueryParam('longitude') || '';

  return (
    <div className="w-full">
      <NaverMap latitude={latitude} longitude={longitude} />
    </div>
  );
}
