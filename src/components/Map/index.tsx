import { cn } from '@/utils/tailwindcss';
import { useEffect, useRef } from 'react';

interface LatLng {
  lat: number;
  lng: number;
}

const Map = ({
  points = [],
  zoom = 15,
  height = 224,
  width,
  className,
}: {
  points?: LatLng[];
  zoom?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}) => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNaverMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
          import.meta.env.VITE_NAVER_MAP_CLIENT_ID
        }`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('네이버 지도 스크립트 로딩 실패'));
        document.head.appendChild(script);
      });
    };

    loadNaverMapScript()
      .then(() => {
        if (!mapElement.current || !window.naver?.maps || points.length === 0) return;

        const { naver } = window;
        const centerPoint = new naver.maps.LatLng(points[0].lat, points[0].lng);
        const map = new naver.maps.Map(mapElement.current, {
          center: centerPoint,
          zoom,
        });

        // 경로 좌표 생성
        const pathArray: naver.maps.LatLng[] = points.map(
          (p) => new naver.maps.LatLng(p.lat, p.lng),
        );

        new naver.maps.Polyline({
          map,
          path: pathArray,
          strokeColor: '#9070CF',
          strokeOpacity: 0.8,
          strokeWeight: 3,
        });

        // LatLngBounds로 모든 좌표를 포함하도록 설정
        const bounds = new naver.maps.LatLngBounds();
        pathArray.forEach((coord) => bounds.extend(coord));

        // fitBounds로 지도 뷰포트를 경로 전체가 보이도록 조정
        map.fitBounds(bounds);

        // map.panToBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
      })
      .catch((error) => console.error(error));
  }, [points, zoom]);

  return (
    <div
      ref={mapElement}
      className={cn('w-full', className)}
      style={{ height: isNaN(Number(height)) ? height : height + 'px', width }}
    />
  );
};

export default Map;
