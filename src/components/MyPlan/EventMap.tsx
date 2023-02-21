import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import {
  InitLocation,
  NewPlanRecoil,
  PickScheduleRecoil,
} from '@/recoil/atom/MyPlan';
import styled from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const EventMap = () => {
  const myPlan = useRecoilValue(NewPlanRecoil);
  const scheduleInfo = useRecoilValue(PickScheduleRecoil);
  const locationInfo = useRecoilValue(InitLocation);

  useEffect(() => {
    const normalImageSrc =
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png';
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

    const options = {
      center: new kakao.maps.LatLng(locationInfo.y, locationInfo.x), //지도의 중심좌표.
      level: locationInfo.level, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    const imageSize = new kakao.maps.Size(35, 35);

    const markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize);

    myPlan?.schedule[scheduleInfo.schedule]?.map((item: any) => {
      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: new kakao.maps.LatLng(item.mapy, item.mapx),
        image: markerImage,
      });
    });
  }, [locationInfo, myPlan, scheduleInfo]);

  return (
    <Wrap>
      <Mapbox id="map"></Mapbox>
    </Wrap>
  );
};

export default EventMap;

export const Wrap = styled.section`
  width: 100%;
  min-height: 100%;
`;
export const Mapbox = styled.div`
  width: 100%;
  height: 400px;
`;
