import { AreaCode, areaCode } from '@/common/utils/areaCode/areaCode';
import { useState, useEffect } from 'react';

const { kakao } = window;

export interface Markers {
  type: string;
  markers: any[];
}

const useCityMarkers = () => {
  const [markers, setMarkers] = useState<Markers>({
    type: 'Do',
    markers: [],
  });
  const [overlays, setOverlays] = useState<any[]>();

  const newMarker = (type: string, array: AreaCode[]) => {
    // 마커 이미지의 이미지 주소
    const imageSrc = require('@/assets/marker2.webp').default;
    // 마커 이미지의 이미지 크기
    const imageSize = new kakao.maps.Size(40, 40);

    const markers = [];
    const overlays = [];
    for (let i = 0; i < array.length; i++) {
      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const content = `
        <div class="customoverlay" style="background-color :#fff; width: auto; height: auto; padding: 2px; border-radius: 5px; border: 1px solid #1753a5;">
          <div style="color: #1753a5; font-weight: 700; font-size: 13px;">${array[i].name}</div>
        </div>`;

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(array[i].mapy, array[i].mapx), // 마커를 표시할 위치
        title: array[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      // 커스텀 오버레이 생성
      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(array[i].mapy, array[i].mapx),
        content,
        title: array[i].name,
        yAnchor: -0.1,
      });
      markers.push(marker);
      overlays.push(overlay);
    }
    setMarkers({ type, markers });
    setOverlays(overlays);
  };

  useEffect(() => {
    newMarker('Do', areaCode);
  }, []);

  return { markers, overlays, newMarker };
};

export default useCityMarkers;
