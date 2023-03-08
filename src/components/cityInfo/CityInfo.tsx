import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { MdLocalFlorist } from 'react-icons/md';
import WeatherInfo from '../CityInfoList/WeatherInfo';
import { City } from '@/types/CityType';
import * as S from './style/CityInfoStyled';

interface Props {
  city: City;
}

const CityInfo = ({ city }: Props) => {
  return (
    <S.Container>
      <S.CityImgBox>
        <S.CitylImg src={city.image} alt="city" />
      </S.CityImgBox>
      {/* 우측 도시 정보 */}
      <S.CityInfoWrapper>
        <S.CityInfoHeader>
          <S.CityEngName>{city.engarea}</S.CityEngName>
          <WeatherInfo city={city} />
        </S.CityInfoHeader>
        <h1>{city.name}</h1>
        <S.CityHashtag>
          {city.hashtag.map((tag, i) => (
            <div key={i}>{tag}</div>
          ))}
        </S.CityHashtag>
        <S.CityIntroBox>
          <S.CityIntroTitle>
            <FaMapMarkerAlt size={20} />
            <S.CityIntroTitleTxt>여행장소</S.CityIntroTitleTxt>
          </S.CityIntroTitle>
          <S.CityIntroTitle>
            <FaRegCalendarAlt size={20} />
            <S.CityIntroTitleTxt>여행시기</S.CityIntroTitleTxt>
          </S.CityIntroTitle>
          <S.CityIntroTitle>
            <MdLocalFlorist size={22} />
            <S.CityIntroTitleTxt>지역 특산물</S.CityIntroTitleTxt>
          </S.CityIntroTitle>
          <S.CityIntroContent>{city.tourcount}</S.CityIntroContent>
          <S.CityIntroContent>{city.tourdate}</S.CityIntroContent>
          <S.CityIntroContent>{city.spec}</S.CityIntroContent>
        </S.CityIntroBox>
        <S.Citydesc>{city.description}</S.Citydesc>
      </S.CityInfoWrapper>
    </S.Container>
  );
};

export default CityInfo;
