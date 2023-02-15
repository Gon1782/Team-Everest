import React from 'react';
import { useEffect } from 'react';
import * as Style from './CitymapStyle';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Citymap = () => {
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(37.56614933439768, 127.01575598500187), //지도의 중심좌표.
      level: 13, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);
  return (
    <Style.Wrap>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </Style.Wrap>
  );
};

export default Citymap;
