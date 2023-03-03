import useMap from '@/hooks/useMap';
import { useRef, useEffect } from 'react';
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
      const position = new kakao.maps.LatLng(area.mapy, area.mapx);
      // 마커 생성
      new kakao.maps.Marker({
        map,
        position,
      });
    }
  }, [map]);

  return <Map ref={mapRef}>{x === '0' ? '위치정보가 없습니다 ㅠㅠ' : ''}</Map>;
};

export default DetailMap;

const Map = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  border-radius: 30px;
`;
