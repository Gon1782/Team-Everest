import * as Style from './CityMapStyled';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

// 우상님 지도api 사용시에 상의 후 따로 type파일 만들예정
declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const CityMapPage = () => {
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default CityMapPage;
