import { useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { areaCode, AreaCode, oneCity } from '@/common/utils/areaCode/areaCode';
import { cityInfo } from '@/common/utils/cityInfo';
import { markerSelector, sideMenuSelector } from '@/common/utils/selector';
import { Markers } from '@/hooks/useCityMarkers';
import * as S from './style/SidebarStyle';

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
    <S.Wrap ref={menuRef}>
      <S.IconWrap onClick={chosen.onClick}>
        <FaArrowLeft size={25}></FaArrowLeft>
        <S.Text>{chosen.text}</S.Text>
      </S.IconWrap>
      {array.map((data: any, index) => {
        return (
          <S.ItemWrap
            key={index}
            onClick={() => (!!sigungu.length ? siGunGu(index) : getDo(index))}
          >
            <S.ImageWrap>
              <S.SideBarImage
                src={
                  !!sigungu.length
                    ? require(`@/assets/CountryImages/${data['engName']}.jpg`)
                        .default
                    : require(`@/assets/CityImage/${index + 1}.jpg`).default
                }
                alt="city"
              />
            </S.ImageWrap>
            <S.title>{data.name}</S.title>
          </S.ItemWrap>
        );
      })}
    </S.Wrap>
  );
};

export default Sidebar;
