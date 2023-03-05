import { useEffect, useState } from 'react';

const { kakao } = window;

const useMap = (ref: React.MutableRefObject<null>, area: any) => {
  const [map, setMap] = useState<any>();

  useEffect(() => {
    const position = new kakao.maps.LatLng(area.mapy, area.mapx);

    const mapOptions = {
      center: position, // 지도의 중심좌표
      level: area.level, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(ref.current, mapOptions);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setMap(map);
  }, []);

  return map;
};

export default useMap;
