import PlaceService from '@/service/place/PlaceService';
import { usePlaceCulture } from '@/service/place/usePlaceService';

export default function Home() {
  const getPlaceData = async () => {
    const response = await PlaceService.getPlaceCulture(10);
    console.log(response);
  };
  getPlaceData();

  const { data } = usePlaceCulture(10, 0);
  console.log('place culture data: ', data);

  return (
    <div className="page">
      <p className="text-20 text-black">Home Page</p>
    </div>
  );
}
