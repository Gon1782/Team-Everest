import React, { useState } from 'react';
import { useEffect } from 'react';
import * as Style from './CitymapStyle';
import { cityInfo } from '@/common/utils/cityInfo';
import { useRecoilValue } from 'recoil';
import {
  InitLocation,
  NewPlanRecoil,
  PickScheduleRecoil,
} from '@/recoil/atom/MyPlan';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Citymap = () => {
  const myPlan = useRecoilValue(NewPlanRecoil);
  const scheduleInfo = useRecoilValue(PickScheduleRecoil);
  const locationInfo = useRecoilValue(InitLocation);

  useEffect(() => {
    var normalImageSrc =
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png';
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

    const options = {
      center: new kakao.maps.LatLng(locationInfo.y, locationInfo.x), //지도의 중심좌표.
      level: locationInfo.level, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    var imageSize = new kakao.maps.Size(35, 35);

    var markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize);

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
    <Style.Wrap>
      <Style.Mapbox id="map"></Style.Mapbox>
    </Style.Wrap>
  );
};

export default Citymap;
