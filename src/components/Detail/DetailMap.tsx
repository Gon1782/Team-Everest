import { useRef, useEffect } from 'react';

const { kakao } = window;

const DetailMap = ({ x, y }) => {
  const mapRef = useRef(null);
  const location = new kakao.maps.LatLng(y, x);

  useEffect(() => {
    const options = {
      center: location,
      level: 2,
    };

    const map = new kakao.maps.Map(mapRef.current, options);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    new kakao.maps.Marker({
      map: map,
      position: location,
    });
  }, []);

  return (
    <div
      style={{ width: '100%', height: '40vh', borderRadius: 30 }}
      ref={mapRef}
    ></div>
  );
};

export default DetailMap;
