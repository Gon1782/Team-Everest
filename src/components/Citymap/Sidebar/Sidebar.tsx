import { FaArrowLeft } from 'react-icons/fa';
import { areaCode, AreaCode, oneCity } from '@/common/utils/areaCode/areaCode';
import { cityInfo } from '@/common/utils/cityInfo';
import { markerSelector, sideMenuSelector } from '@/common/utils/selector';
import * as Style from './style/SidebarStyle';
import { Markers } from '@/hooks/useCityMarkers';
import { CityAreaInfo } from '@/recoil/atom/CityAreaInfo';
import { useRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';

interface Props {
  areacode: string;
  map: any;
  markers: Markers;
  overlays?: any[];
  newMarker: (type: string, array: AreaCode[]) => void;
  setAreaCode: React.Dispatch<React.SetStateAction<string>>;
  setSigunguCode: React.Dispatch<React.SetStateAction<string>>;
  openModal: () => void;
  Do: (i: number) => void;
  gwangYeokSi: (i: number) => void;
  siGunGu: (i: number) => void;
}

const { kakao } = window;

const Sidebar = ({
  areacode,
  map,
  markers,
  overlays,
  newMarker,
  setAreaCode,
  setSigunguCode,
  Do,
  gwangYeokSi,
  siGunGu,
}: Props) => {
  const menuRef = useRef<HTMLElement>(null);
  const sigungu = markerSelector(areacode);
  const array = !!sigungu.length ? sigungu : cityInfo;

  const goBack = () => {
    const prevMarkers = markers.markers;
    prevMarkers.forEach((marker) => marker.setMap(null));
    overlays?.forEach((overlay) => overlay.setMap(null));
    newMarker('Do', areaCode);
    map.setCenter(new kakao.maps.LatLng(37, 127));
    map.setLevel(13);
    setAreaCode('');
    setSigunguCode('');
  };

  const getDo = (i: number) => {
    if (oneCity.includes(`${i + 1}`) || i === cityInfo.length - 1) {
      gwangYeokSi(i);
    } else {
      Do(i);
    }
  };

  const chosen = sideMenuSelector(areacode, goBack);

  useEffect(() => {
    menuRef.current?.scrollTo(0, 0);
  }, [areacode]);

  return (
    <Style.Wrap ref={menuRef}>
      <Style.IconWrap onClick={chosen.onClick}>
        <FaArrowLeft size={25}></FaArrowLeft>
        <Style.Text>{chosen.text}</Style.Text>
      </Style.IconWrap>
      {array.map((data, index) => {
        return (
          <Style.ItemWrap
            key={index}
            onClick={() => (!!areacode ? siGunGu(index) : getDo(index))}
          >
            <Style.ImageWrap>
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '5px',
                }}
                src={
                  !!areacode
                    ? ''
                    : require(`@/assets/CityImage/${index + 1}.jpg`).default
                }
              />
            </Style.ImageWrap>
            <Style.title>{data.name}</Style.title>
          </Style.ItemWrap>
        );
      })}
    </Style.Wrap>
  );
};

export default Sidebar;
