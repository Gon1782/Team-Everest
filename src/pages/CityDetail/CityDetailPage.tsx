import React from 'react';
import * as Style from './CityDetailPageStyled';
import { CityAreaInfo } from '@/recoil/atom/CityAreaInfo';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { cityInfo } from '@/common/utils/cityInfo';
import CityInfoList from '@/components/CityInfoList/CityInfoList';

const CityDetailPage = () => {
  const navigate = useNavigate();
  const [areaInfo, setAreaInfo] = useRecoilState(CityAreaInfo);
  const { id } = useParams();
  const fileNumber = cityInfo.findIndex(({ areacode }) => areacode === id) + 1;
  return (
    <Style.Wrap>
      <img
        style={{
          display: 'block',
          width: '100%',
          height: '560px',
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
        }}
        src={require(`@/assets/CityImage/${fileNumber}.jpg`).default}
      ></img>
      <Style.WeatherWrap>도시 api 넣을 예정</Style.WeatherWrap>
      <Style.Introduce>
        Welcome to {cityInfo[fileNumber - 1].korarea} !
      </Style.Introduce>

      {/* 음식점 */}
      {/* 리스트 */}
      <CityInfoList id={id} />
      {/* 레포츠 */}
    </Style.Wrap>
  );
};

export default CityDetailPage;
