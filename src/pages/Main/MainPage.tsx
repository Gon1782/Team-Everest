import { auth } from '@/common/api/firebase';
import EventSlideBanner from '@/components/main/eventBanner/EventSlideBanner';
import ThemeSlideBanner from '@/components/main/themeBanner/ThemeSlideBanner';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BestTravelPlan from '@/components/main/bestTravelPlan/BestTravelPlan';
import TopCityBanner from '@/components/main/topCityBanner/TopCityBanner';

const MainPage = () => {
  return (
    <MainContainer>
      {/* 상단 슬라이드 배너 */}
      <TopBanner>
        <EventSlideBanner />
      </TopBanner>
      {/* 인기도시 */}
      <TopCityBanner />
      {/* 테마 명소 */}
      <ThemeSlideBanner />
      {/* 베스트 여행 일정 */}
      <BestTravelPlan />
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
