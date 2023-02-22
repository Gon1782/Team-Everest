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
    kakao.maps.load(function () {
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

      const options = {
        center: new kakao.maps.LatLng(locationInfo.y, locationInfo.x), //지도의 중심좌표.
        level: locationInfo.level, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      const linePath: any = [];
      myPlan?.schedule[scheduleInfo.schedule]?.map(
        (item: any, index: number) => {
          // 좌표 담아서 선 그려야함
          linePath.push(new kakao.maps.LatLng(item.mapy, item.mapx));
          // 마커 생성
          new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다.
            map: map,
            position: new kakao.maps.LatLng(item.mapy, item.mapx),

            image: new kakao.maps.MarkerImage(
              `https://img.icons8.com/color/48/null/${
                index + 1
              }-circle-c--v1.png`,
              new kakao.maps.Size(35, 35),
            ),
          });
        },
      );
      // 선 생성
      new kakao.maps.Polyline({
        map: map, // 지도에 선을 생성합니다.
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: 'black', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
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
