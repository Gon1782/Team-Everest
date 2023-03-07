import { useEffect, useRef, useState } from 'react';
import { cityInfo } from '@/common/utils/cityInfo';
import { oneCity } from '@/common/utils/areaCode/areaCode';
import { markerSelector } from '@/common/utils/selector';
import useCityMarkers from '@/hooks/useCityMarkers';
import useMap from '@/hooks/useMap';
import useModal from '@/hooks/useModal';
import CityInfoModal from './CityInfoModal';
import Sidebar from './Sidebar/Sidebar';
import * as S from './style/CitymapStyle';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Citymap = () => {
  const mapRef = useRef(null);

  const area = { mapy: 37, mapx: 127, level: 13 };

  const [areaCode, setAreaCode] = useState('');
  const [sigunguCode, setSigunguCode] = useState('');

  const [modal, openModal, closeModal, closeModalIfClickOutside] = useModal();

  const map = useMap(mapRef, area);

  const { markers, overlays, newMarker } = useCityMarkers();

  const gwangYeokSi = (i: number) => {
    setAreaCode(cityInfo[i].areacode);
    const center = new kakao.maps.LatLng(cityInfo[i].mapy, cityInfo[i].mapx);
    map.setCenter(center);
    map.setLevel(9);
    openModal();
  };

  const Do = (i: number) => {
    setAreaCode(cityInfo[i].areacode);
    const prevMarkers = markers.markers;
    prevMarkers.forEach((marker) => marker.setMap(null));
    overlays?.forEach((overlay) => overlay.setMap(null));
    const sigungu = markerSelector(cityInfo[i].areacode);
    const center = new kakao.maps.LatLng(cityInfo[i].mapy, cityInfo[i].mapx);
    newMarker('sigungu', sigungu);
    map.setCenter(center);
    map.setLevel(11);
  };

  const siGunGu = (i: number) => {
    const sigungu = markerSelector(areaCode);
    setSigunguCode(sigungu[i].code);
    const center = new kakao.maps.LatLng(sigungu[i].mapy, sigungu[i].mapx);
    map.setCenter(center);
    map.setLevel(9);
    openModal();
  };

  useEffect(() => {
    const type = markers.type;
    const nowMarkers = markers.markers;
    if (type === 'Do') {
      nowMarkers.forEach((marker, i) => {
        if (oneCity.includes(`${i + 1}`) || i === nowMarkers.length - 1) {
          kakao.maps.event.addListener(marker, 'click', () => {
            gwangYeokSi(i);
          });
          marker.setMap(map);
        } else {
          kakao.maps.event.addListener(marker, 'click', () => {
            Do(i);
          });
          marker.setMap(map);
        }
      });
      overlays?.forEach((overlay) => overlay.setMap(map));
    } else {
      nowMarkers.forEach((marker, i) => {
        kakao.maps.event.addListener(marker, 'click', () => {
          siGunGu(i);
        });
        marker.setMap(map);
      });
      overlays?.forEach((overlay) => overlay.setMap(map));
    }
  }, [markers]);

  return (
    <>
      <Sidebar
        areacode={areaCode}
        map={map}
        markers={markers}
        overlays={overlays}
        newMarker={newMarker}
        setAreaCode={setAreaCode}
        setSigunguCode={setSigunguCode}
        openModal={openModal}
        Do={Do}
        gwangYeokSi={gwangYeokSi}
        siGunGu={siGunGu}
      />
      <S.Wrap>
        <S.Mapbox ref={mapRef} />
        {/* 모달 */}
        {modal && (
          <CityInfoModal
            areaCode={areaCode}
            sigunguCode={sigunguCode}
            closeModalIfClickOutside={closeModalIfClickOutside}
            closeModal={closeModal}
          />
        )}
      </S.Wrap>
    </>
  );
};

export default Citymap;
