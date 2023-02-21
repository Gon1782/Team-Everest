import React from 'react';
import { useEffect, useRef } from 'react';
import * as Style from './CitymapStyle';
import { cityInfo } from '@/common/utils/cityInfo';
import { CityArea } from '@/recoil/atom/CityArea';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Citymap = () => {
  useEffect(() => {
    kakao.maps.load(() => {
      const position = new kakao.maps.LatLng(
        35.5387010197949,
        128.345498927795,
      );

      let el = document.getElementById('map');

      const mapOptions = {
        center: position, // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(el, mapOptions);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마커 이미지의 이미지 주소
      let imageSrc = require('@/assets/marker.png').default;
      // 마커 이미지의 이미지 크기
      let imageSize = new kakao.maps.Size(60, 60);

      function setCenter() {
        // 이동할 위도 경도 위치를 생성합니다
        let moveLatLon = new kakao.maps.LatLng(126.570888);

        // 지도 중심을 이동 시킵니다
        map.setCenter(moveLatLon);
      }

      for (let i = 0; i < cityInfo.length; i++) {
        // 마커 이미지를 생성합니다
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        // console.log(markerImage);

        // console.log(cityInfo[i].mapy, cityInfo[i].mapx);

        //추가
        const content = `
        <div class="customoverlay">
          <span>cityInfo[i].korarea</span>
        </div>`;

        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(cityInfo[i].mapy, cityInfo[i].mapx), // 마커를 표시할 위치
          title: cityInfo[i].korarea, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });

        // 커스텀 오버레이 생성
        // new kakao.maps.CustomOverlay({
        //   map,
        //   position,
        //   content,
        //   // image: markerImage,
        // });

        // console.log(marker);
        // marker.setMap(map);
      }
    });
  }, []);

  return (
    <Style.Wrap>
      <Style.Mapbox id="map"></Style.Mapbox>
    </Style.Wrap>
  );
};

export default Citymap;
