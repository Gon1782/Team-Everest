import { RefObject, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  InitLocation,
  NewPlanRecoil,
  PickScheduleRecoil,
  PlanType,
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
  const mapRef: any = useRef();

  useEffect(() => {
    kakao.maps.load(function () {
      const map = setMap(locationInfo, mapRef); //지도 생성 및 객체 리턴
      const linePath: any = [];
      if (!!myPlan.schedule[scheduleInfo.schedule]?.length) {
        setPolyLine(
          map,
          setMarker(myPlan.schedule[scheduleInfo.schedule], map, linePath),
          '#EF4B27',
        );
      }
    });
  }, [locationInfo, myPlan, scheduleInfo]);

  return (
    <Wrap>
      <Mapbox ref={mapRef} height={350}></Mapbox>
    </Wrap>
  );
};

export const CloneEventMap = ({
  plan,
  startDate,
  height,
}: {
  plan: PlanType;
  startDate: string;
  height: number;
}) => {
  const myPlan = plan.schedule[startDate];

  const locationInfo = useRecoilValue(InitLocation);
  const mapRef: any = useRef();
  useEffect(() => {
    kakao.maps.load(() => {
      const map = setMap(locationInfo, mapRef); //지도 생성 및 객체 리턴

      const linePath: any = [];
      setPolyLine(map, setMarker(myPlan, map, linePath), '#EF4B27');
    });
  }, []);

  return (
    <Wrap>
      <Mapbox ref={mapRef} height={height} visible={'none'}></Mapbox>
    </Wrap>
  );
};

const setMap = (
  locationInfo: {
    x: number;
    y: number;
    level: number;
  },
  mapRef: RefObject<HTMLElement>,
) => {
  const container = mapRef.current;
  const options = {
    center: new kakao.maps.LatLng(locationInfo.y, locationInfo.x),
    level: locationInfo.level,
  };

  return new kakao.maps.Map(container, options);
};

const setPolyLine = (map: any, linePath: any[], lineColor: string) => {
  // 선 생성
  new kakao.maps.Polyline({
    map: map,
    path: linePath,
    strokeWeight: 5,
    strokeColor: lineColor,
    strokeOpacity: 0.7,
    strokeStyle: 'solid',
  });
};

const setMarker = (plan: [], map: any, linePath: any[]): any[] => {
  const bounds = new kakao.maps.LatLngBounds();

  plan?.map((item: any, index: number) => {
    // 좌표 담아서 선 그려야함
    linePath.push(new kakao.maps.LatLng(item.mapy, item.mapx));
    // 마커 생성
    new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다.
      map: map,
      position: new kakao.maps.LatLng(item.mapy, item.mapx),

      image: new kakao.maps.MarkerImage(
        `https://img.icons8.com/ios-filled/50/004a7c/${index + 1}-circle.png`,
        new kakao.maps.Size(25, 25),
      ),
    });

    bounds.extend(new kakao.maps.LatLng(item.mapy, item.mapx));
    map.setBounds(bounds);
  });

  return linePath;
};

export default EventMap;

export const Wrap = styled.section`
  width: 100%;
  min-height: 100%;
`;

export const Mapbox = styled.div<{ height: number; visible?: string }>`
  width: 100%;
  height: ${(props) => props.height + 'px'};
  pointer-events: ${(props) => props?.visible};
  object-fit: cover;
  border-radius: 2%;
`;
