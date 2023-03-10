import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCities } from '@/common/api/cityApi';
import CityInfo from '@/components/cityInfo/CityInfo';
import Amusement from '@/components/Amusement/Amusement';
import CityInfoList from '@/components/CityInfoList/CityInfoList';
import WeatherInfo from '@/components/CityInfoList/WeatherInfo';
import Michelin from '@/components/Michelin/Michelin';
import { City } from '@/types/CityType';
import * as S from './style/CityDetailPageStyled';

const CityDetailPage = () => {
  const api = {
    url: process.env.API_URL,
    api_key: process.env.WEATHER_API_KEY,
  };
  const { areaCode = '', sigunguCode = '' } = useParams();
  const [areaInfo, setAreaInfo] = useState<City>();

  const getCity = async () => {
    await getCities(areaCode, sigunguCode)
      .then((res) => setAreaInfo(res))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCity();
  }, [areaCode, sigunguCode]);

  if (!areaInfo) return <div>로딩중...</div>;

  return (
    <S.Wrap>
      {/* 도시 정보 */}
      <CityInfo city={areaInfo} />
      {/* 음식점 */}
      <Michelin city={areaInfo} />
      {/* 레포츠 */}
      <Amusement city={areaInfo} />
      {/* 랜덤리스트 */}
      <CityInfoList city={areaInfo} />
    </S.Wrap>
  );
};

export default CityDetailPage;
