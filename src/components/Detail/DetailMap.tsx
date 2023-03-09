import useMap from '@/hooks/useMap';
import { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';

const { kakao } = window;

interface Props {
  x?: string;
  y?: string;
}

const DetailMap = ({ x, y }: Props) => {
  const mapRef = useRef(null);

  const area = {
    mapx: x,
    mapy: y,
    level: 2,
  };

  const map = useMap(mapRef, area);

  useEffect(() => {
    if (map) {
      // 마커 이미지의 이미지 주소
      const imageSrc = require('@/assets/marker2.webp').default;
      // 마커 이미지의 이미지 크기
      const imageSize = new kakao.maps.Size(40, 40);

      const image = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const position = new kakao.maps.LatLng(area.mapy, area.mapx);
      // 마커 생성
      new kakao.maps.Marker({
        map,
        position,
        image,
      });
    }
  }, [map]);

  return <Map ref={mapRef}>{x === '0' ? '위치정보가 없습니다 ㅠㅠ' : ''}</Map>;
};

export default memo(DetailMap);

const Map = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  border-radius: 30px;
`;
