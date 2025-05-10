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
        if ((window as any).naver && (window as any).naver.maps) {
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
        if (!mapElement.current || !(window as any).naver?.maps || points.length === 0) return;

        const naver = (window as any).naver;
        const centerPoint = new naver.maps.LatLng(points[0].lat, points[0].lng);
        const map = new naver.maps.Map(mapElement.current, {
          center: centerPoint,
          zoom,
        });

        // 경로 좌표 생성
        const pathArray: any[] = points
          .map((p) => new (window as any).naver.maps.LatLng(p.lat, p.lng))
          .sort((a, b) => a.lat - b.lat);

        new (window as any).naver.maps.Polyline({
          map,
          path: pathArray,
          strokeColor: '#9070CF',
          strokeOpacity: 0.8,
          strokeWeight: 3,
        });

        points
          .sort((a, b) => a.lat - b.lat)
          .forEach(({ lat, lng }) => {
            new naver.maps.Marker({
              position: new naver.maps.LatLng(lat, lng),
              map,
              icon: {
                url: '/svg/ico-line.svg', // 원하는 마커 이미지 경로
                size: new naver.maps.Size(40, 40), // 실제 이미지 표시 크기
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(20, 40), // 이미지 하단 중앙이 좌표에 닿도록
              },
            });
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
