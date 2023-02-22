import React from 'react';
import { useEffect, useRef } from 'react';
import * as Style from './CitymapStyle';
import { useRecoilState } from 'recoil';
import { cityInfo } from '@/common/utils/cityInfo';

import { CityAreaInfo } from '@/recoil/atom/CityAreaInfo';
import { CityArea } from '@/recoil/atom/CityArea';
import useModal from '@/hooks/useModal';
import CityInfoModal from './CityInfoModal';

declare global {
  interface Window {
    kakao: any;
  }
}

interface InfoType {
  areacode: string;
  engarea: string;
  korarea: string;
  description: string;
  hashtag: string[];
  tourcount: string;
  tourdate: string;
  spec: string;
  jpgindex: number;
}

const { kakao } = window;

const Citymap = () => {
  const [area, setArea] = useRecoilState(CityArea);
  const [areaInfo, setAreaInfo] = useRecoilState(CityAreaInfo);

  const [modal, openModal, closeModal, closeModalIfClickOutside] = useModal();

  useEffect(() => {
    kakao.maps.load(() => {
      const position = new kakao.maps.LatLng(area.mapy, area.mapx);

      let el = document.getElementById('map');

      const mapOptions = {
        center: position, // 지도의 중심좌표
        level: area.level, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(el, mapOptions);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마커 이미지의 이미지 주소
      let imageSrc = require('@/assets/marker.png').default;
      // 마커 이미지의 이미지 크기
      let imageSize = new kakao.maps.Size(60, 60);

      for (let i = 0; i < cityInfo.length; i++) {
        // 마커 이미지를 생성합니다
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const content = `
        <div class="customoverlay" style="background-color :#fff; width: auto; height: auto; padding: 2px; border-radius: 5px; border: 1px solid #1753a5;">
          <div style="color: #1753a5; font-weight: 700; font-size: 13px;">${cityInfo[i].korarea}</div>
        </div>`;

        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(cityInfo[i].mapy, cityInfo[i].mapx), // 마커를 표시할 위치
          title: cityInfo[i].korarea, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });

        // 커스텀 오버레이 생성
        new kakao.maps.CustomOverlay({
          map,
          position: new kakao.maps.LatLng(cityInfo[i].mapy, cityInfo[i].mapx),
          content,
          title: cityInfo[i].korarea,
          image: markerImage,
        });

        marker.setMap(map);

        kakao.maps.event.addListener(marker, 'click', () => {
          //모달 생성
          const object: InfoType = {
            areacode: cityInfo[i].areacode,
            engarea: cityInfo[i].engarea,
            korarea: cityInfo[i].korarea,
            description: cityInfo[i].description,
            hashtag: cityInfo[i].hashtag,
            tourcount: cityInfo[i].tourcount,
            tourdate: cityInfo[i].tourdate,
            spec: cityInfo[i].spec,
            jpgindex: i + 1,
          };
          setAreaInfo({ ...object });

          openModal();
        });
      }
    });
  }, [area]);

  return (
    <Style.Wrap>
      <Style.Mapbox id="map"></Style.Mapbox>
      {/* 모달 */}
      {modal && (
        <CityInfoModal
          closeModalIfClickOutside={closeModalIfClickOutside}
          closeModal={closeModal}
        />
      )}
    </Style.Wrap>
  );
};

export default Citymap;
