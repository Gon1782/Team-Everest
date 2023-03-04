import React, { useEffect, useState } from 'react';
import * as Style from './CityDetailPageStyled';
import { CityAreaInfo } from '@/recoil/atom/CityAreaInfo';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { cityInfo } from '@/common/utils/cityInfo';
import CitySection from '@/components/common/CitySection';
import CityInfoList from '@/components/CityInfoList/CityInfoList';
import WeatherInfo from '@/components/CityInfoList/WeatherInfo';

const CityDetailPage = () => {
  const navigate = useNavigate();
  const [areaInfo, setAreaInfo] = useRecoilState(CityAreaInfo);
  const { id } = useParams();
  const city = cityInfo.filter(({ areacode }) => areacode === id)[0];
  console.log('city', city);
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
      <Style.WeatherWrap>
        <WeatherInfo city={city} />
      </Style.WeatherWrap>
      <Style.Introduce>{city.name}에 대해 자세히 보여드릴게요!</Style.Introduce>

      {/* 음식점 */}
      <CitySection name="Michelin" city={city} />
      {/* 레포츠 */}
      <CitySection name="Amusement" city={city} />
      {/* 랜덤리스트 */}
      <CityInfoList id={id} city={city} />
    </Style.Wrap>
  );
};

export default CityDetailPage;
