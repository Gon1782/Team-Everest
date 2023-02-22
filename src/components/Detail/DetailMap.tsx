import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

interface Props {
  x: string;
  y: string;
}

const DetailMap = ({ x, y }: Props) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const location = new kakao.maps.LatLng(y, x);

    const options = {
      center: location,
      level: 2,
    };

    // 맵 생성
    const map = new kakao.maps.Map(mapRef.current, options);

    // 줌컨트롤 ON
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    // 마커 생성
    new kakao.maps.Marker({
      map: map,
      position: location,
    });
  }, []);

  return <Map ref={mapRef}></Map>;
};

export default DetailMap;

const Map = styled.div`
  width: 100%;
  height: 40vh;
  border-radius: 30px;
`;
