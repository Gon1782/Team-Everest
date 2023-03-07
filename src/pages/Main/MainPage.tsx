import EventSlideBanner from '@/components/main/eventBanner/EventSlideBanner';
import ThemeSlideBanner from '@/components/main/themeBanner/ThemeSlideBanner';
import styled from 'styled-components';
import BestTravelPlan from '@/components/main/bestTravelPlan/BestTravelPlan';
import TopCityBanner from '@/components/main/topCityBanner/TopCityBanner';

const MainPage = () => {
  // FB 도시 DB 업로드
  // const a = Chungbuk.map((x) => {
  //   const key = Object.keys(x)[0];
  //   const value = Object.values(x)[0];
  //   return { key, value };
  // });

  // const uploadCities = () => {
  //   for (let i = 0; i < a.length; i++) {
  //     postCities(a[i].key, a[i].value);
  //   }
  // };

  return (
    <MainContainer>
      {/* 상단 슬라이드 배너 */}
      <TopBanner>
        <EventSlideBanner />
      </TopBanner>
      {/* FB 도시 DB 업로드 */}
      {/* <button onClick={() => uploadCities()}>업로드도시</button> */}
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
`;
