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
        37.56614933439768,
        127.01575598500187,
      );

      let el = document.getElementById('map');

      const mapOptions = {
        center: position, // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(el, mapOptions); //current??

      // 마커 이미지의 이미지 주소
      let imageSrc = '@/assets/MyPage/defaultProfile.jpg';

      for (let i = 0; i < cityInfo.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        let imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // console.log(cityInfo[i].mapy, cityInfo[i].mapx);

        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(cityInfo[i].mapy, cityInfo[i].mapx), // 마커를 표시할 위치
          title: cityInfo[i].korarea, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
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
