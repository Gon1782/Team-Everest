import { auth } from '@/common/api/firebase';
import Banner from '@/components/banner/Banner';
import TopSlideBanner from '@/components/banner/TopSlideBanner';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swiper from 'swiper';

const MainPage = () => {
  return (
    <MainContainer>
      {/* 상단 슬라이드 배너 */}
      <TopBanner>
        <TopSlideBanner />
      </TopBanner>
      {/* 검색창 */}
      <SearchContainer>
        <SearchForm>
          <SearchInput></SearchInput>
          <SearchButton>검색</SearchButton>
        </SearchForm>
        <SearchOnMap>지도에서 검색</SearchOnMap>
      </SearchContainer>
      {/* 인기도시 카테고리 */}
      <TopCityCategoryContainer>
        <CategoriesTitle>인기 도시</CategoriesTitle>
        <TopCityCategories>
          <TopCityCategory>도시</TopCityCategory>
          <TopCityCategory>도시</TopCityCategory>
          <TopCityCategory>도시</TopCityCategory>
          <TopCityCategory>도시</TopCityCategory>
          <TopCityCategory>도시</TopCityCategory>
          <TopCityCategory>도시</TopCityCategory>
        </TopCityCategories>
      </TopCityCategoryContainer>

      {/* 추천 플레이스 리스트 */}
      <RecommendedContainer>
        <RecommendedPlacesTitle>추천 플레이스</RecommendedPlacesTitle>
        <RecommendedPlaces>
          <RecommendedPlaceCard>
            <RecommendedPlaceCardImg
              src={require('@/assets/banner_01.jpg').default}
              alt=""
            />
          </RecommendedPlaceCard>
          <RecommendedPlaceCard>
            <RecommendedPlaceCardImg
              src={require('@/assets/banner_01.jpg').default}
              alt=""
            />
          </RecommendedPlaceCard>
          <RecommendedPlaceCard>
            <RecommendedPlaceCardImg
              src={require('@/assets/banner_01.jpg').default}
              alt=""
            />
          </RecommendedPlaceCard>
          <RecommendedPlaceCard>
            <RecommendedPlaceCardImg
              src={require('@/assets/banner_01.jpg').default}
              alt=""
            />
          </RecommendedPlaceCard>
          <RecommendedPlaceCard>
            <RecommendedPlaceCardImg
              src={require('@/assets/banner_01.jpg').default}
              alt=""
            />
          </RecommendedPlaceCard>
          <RecommendedPlaceCard>
            <RecommendedPlaceCardImg
              src={require('@/assets/banner_01.jpg').default}
              alt=""
            />
          </RecommendedPlaceCard>
        </RecommendedPlaces>
      </RecommendedContainer>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// 검색창
const SearchContainer = styled.div`
  width: 25%;
  height: 100px;
  background-color: #d7d7d7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 100px;
  border: none;
  outline: none;
  padding: 1rem;
  margin-right: 8px;
`;

const SearchButton = styled.button`
  width: 65px;
  height: 40px;
  border-radius: 100px;
`;

const SearchOnMap = styled.div`
  margin-top: 10px;
  width: 100%;
  text-align: right;
`;

// 상단 슬라이더 배너
const TopBanner = styled.div`
  background-color: #e3e3e3;
  align-items: center;
  display: flex;
  /* @media screen and (max-width: 768px) {
    display: none;
  } */
`;

// 인기도시 카테고리
const TopCityCategoryContainer = styled.section`
  width: 30%;
  height: 120px;
  padding: 1rem;
  background-color: grey;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 1rem;
`;

const CategoriesTitle = styled.h2`
  font-size: 1.5rem;
  color: #0c0c0c;
`;

const TopCityCategories = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
`;

const TopCityCategory = styled.div`
  min-width: 80px;
  height: 28px;
  border-radius: 30px;
  background-color: lightgrey;
  text-align: center;
  line-height: 28px;
  font-size: 0.9rem;
`;

// 추천 플레이스 리스트

const RecommendedContainer = styled.div`
  width: 58rem;
  margin: 0 auto;
  background-color: grey;
`;

const RecommendedPlacesTitle = styled.h2`
  font-size: 1.6rem;
  width: 100%;
  padding: 10px;
`;

const RecommendedPlaces = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 40px;
  width: 100%;
  height: 500px;
  background-color: #bfbfbf;
  margin: 0 auto;
  padding: 2rem;
`;

const RecommendedPlaceCard = styled.div`
  width: 20%;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  position: relative;
`;

const RecommendedPlaceCardImg = styled.img`
  width: 100%;
  height: 200px;
  /* overflow: hidden; */
  position: absolute;
  object-fit: cover;
  border-radius: 10px;
`;
