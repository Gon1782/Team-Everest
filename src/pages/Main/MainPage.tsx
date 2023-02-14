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
      {/* 인기도시 */}
      <TopCityCategoryContainer>
        <CategoriesTitle>인기 도시</CategoriesTitle>
        <TopCityCategories>
          <TopCityCategory
            src={require('@/assets/banner_02.jpg').default}
            alt="slide banner2"
          />
          <TopCityCategory
            src={require('@/assets/banner_02.jpg').default}
            alt="slide banner2"
          />
          <TopCityCategory
            src={require('@/assets/banner_02.jpg').default}
            alt="slide banner2"
          />
        </TopCityCategories>
      </TopCityCategoryContainer>

      {/* 테마 명소 */}
      <ThemePlaceContainer>
        <ThemePlaceTitle>테마가 있는 명소</ThemePlaceTitle>
        <HashTagList>
          <HashTag>#해쉬태그1</HashTag>
          <HashTag>#해쉬태그2</HashTag>
          <HashTag>#해쉬태그3</HashTag>
        </HashTagList>
        <ThemePlaces>
          <ThemePlaceList>
            <ThemePlace>해쉬태그1 명소1</ThemePlace>
            <ThemePlace>해쉬태그1 명소2</ThemePlace>
            <ThemePlace>해쉬태그1 명소3</ThemePlace>
            <ThemePlace>해쉬태그1 명소4</ThemePlace>
            <ThemePlace>해쉬태그1 명소5</ThemePlace>
            <ThemePlace>해쉬태그1 명소6</ThemePlace>
          </ThemePlaceList>
          <ThemePlaceCard>
            <Link to="">
              <ThemePlaceCardImg
                src={require('@/assets/banner_01.jpg').default}
                alt=""
              />
            </Link>

            <Link to="">
              <ThemePlaceCardImg
                src={require('@/assets/banner_01.jpg').default}
                alt=""
              />
            </Link>
            <Link to="">
              <ThemePlaceCardImg
                src={require('@/assets/banner_01.jpg').default}
                alt=""
              />
            </Link>
            <Link to="">
              <ThemePlaceCardImg
                src={require('@/assets/banner_01.jpg').default}
                alt=""
              />
            </Link>
            <Link to="">
              <ThemePlaceCardImg
                src={require('@/assets/banner_01.jpg').default}
                alt=""
              />
            </Link>
            <Link to="">
              <ThemePlaceCardImg
                src={require('@/assets/banner_01.jpg').default}
                alt=""
              />
            </Link>
          </ThemePlaceCard>
        </ThemePlaces>
      </ThemePlaceContainer>
      {/* 베스트 여행 일정 */}
      <BestTravelRouteContainer>
        <BestTravelRouteCard>
          <TravelPlaceMainImgWrapper>
            <TravelPlaceMainImg
              src={require('@/assets/banner_01.jpg').default}
              alt=""
            />
          </TravelPlaceMainImgWrapper>
          <Wrapper>
            <TravelPlaceReviewerImgWrapper>
              <TravelPlaceReviewerImg
                src={require('@/assets/blankProfiles.png').default}
                alt=""
              />
            </TravelPlaceReviewerImgWrapper>
            <TravelPlaceName>관광지 이름</TravelPlaceName>
          </Wrapper>
          <TravelPlaceSubImgWrapper>
            <TravelPlaceSubImg
              src={require('@/assets/banner_03.jpg').default}
              alt=""
            />
          </TravelPlaceSubImgWrapper>
        </BestTravelRouteCard>
      </BestTravelRouteContainer>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
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

// 인기도시
const TopCityCategoryContainer = styled.section`
  width: 60%;
  height: 350px;
  padding: 2rem;
  background-color: grey;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const CategoriesTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 900;
  color: #0c0c0c;
  margin-bottom: 30px;
`;

const TopCityCategories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 0.7rem;
  width: 100%;
  height: 100%;
`;

const TopCityCategory = styled.img`
  width: 30%;
  height: 100%;
  border-radius: 15px;
  text-align: center;
  line-height: 28px;
  font-size: 0.9rem;
  object-fit: cover;
`;

// 테마 명소

const ThemePlaceContainer = styled.div`
  width: 100%;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-color: grey;
`;

const ThemePlaceTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 900;
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
`;

const HashTagList = styled.ul`
  font-weight: 900;
  display: flex;
  margin-bottom: 20px;
  gap: 40px;
  font-size: 1.2rem;
`;

const HashTag = styled.li`
  font-size: 1.8rem;
`;

const ThemePlaces = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #902f2f;
  position: relative;
  margin-top: 20px;
`;

const ThemePlaceList = styled.ul`
  position: absolute;
  left: 0;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e0e0db;
`;

const ThemePlace = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% / 6);
  font-size: 1.2rem;
  padding: 20px;
  border-bottom: 1px solid #000;
`;

const ThemePlaceCard = styled.div`
  display: flex;
  width: 75%;
  height: 600px;
  background-color: white;
  position: absolute;
  right: 0;
`;

const ThemePlaceCardImg = styled.img`
  width: 400px;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
`;

// 베스트 여행 일정

const BestTravelRouteContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #d68989;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 70px 50px;
`;

const BestTravelRouteCard = styled.div`
  background-color: #dadada;
  border-radius: 10px;
  width: 250px;
  height: 350px;
  margin: 0 10px 20px 10px;
  position: relative;
  overflow: hidden;
`;

const TravelPlaceMainImgWrapper = styled.div`
  background-color: #b6b6b6;
  height: 40%;
`;

const TravelPlaceMainImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: absolute;
  /* bottom: 35%; */
  top: 33%;
  left: 0;
  right: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TravelPlaceReviewerImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: #383838;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
`;

const TravelPlaceReviewerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TravelPlaceName = styled.h4`
  margin-top: 20px;
`;

const TravelPlaceSubImgWrapper = styled.div`
  background-color: #9b6969;
  height: 60%;
`;

const TravelPlaceSubImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
