import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

export default function NaverMap({
  latitude,
  longitude,
  zoom = 14,
  height = 198,
  width,
  className,
}: {
  latitude: number | string;
  longitude: number | string;
  zoom?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNaverMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_MAP_CLIENT_ID}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('네이버 지도 스크립트 로딩 실패'));
        document.head.appendChild(script);
      });
    };

    loadNaverMapScript()
      .then(() => {
        if (mapElement.current && window.naver && window.naver.maps) {
          const map = new window.naver.maps.Map(mapElement.current, {
            center: new window.naver.maps.LatLng(latitude, longitude),
            zoom,
          });
          // TODO: 마커, 이벤트 등 추가 설정
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(latitude, longitude),
            map,
          });
        }
      })
      .catch((error) => console.error(error));
  }, [latitude, longitude]);

  return <div ref={mapElement} className={'h-[200px] w-full'} />;
}
