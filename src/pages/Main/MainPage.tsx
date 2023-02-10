import Banner from '@/components/banner/Banner';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <MainContainer>
      {/* 상단 배너 */}
      <Banner />
      {/* 지역별 카테고리 */}
      <RegionCategoryContainer>
        <CategoriesTitle>지역별 카테고리</CategoriesTitle>
        <RegionCategories>
          <button>&lt;</button>
          <RegionCategory>도시</RegionCategory>
          <RegionCategory>도시</RegionCategory>
          <RegionCategory>도시</RegionCategory>
          <RegionCategory>도시</RegionCategory>
          <RegionCategory>도시</RegionCategory>
          <RegionCategory>도시</RegionCategory>
          <RegionCategory>도시</RegionCategory>
          <RegionCategory>도시</RegionCategory>
          <button>&gt;</button>
        </RegionCategories>
      </RegionCategoryContainer>
      {/* 테마 카테고리 */}
      <ThemeCategories>
        <ThemeCategory>&#35; 테마</ThemeCategory>
        <ThemeCategory>&#35; 테마</ThemeCategory>
        <ThemeCategory>&#35; 테마테마테</ThemeCategory>
        <ThemeCategory>&#35; 테마</ThemeCategory>
        <ThemeCategory>&#35; 테마테마테마</ThemeCategory>
      </ThemeCategories>
      {/* 구별 카테고리 */}

      <SubRegionCategories>
        <SubRegionCategoryCard>
          <SubRegionCategoryCardImg
            src={require('@/assets/banner_bg.jpg').default}
            alt=""
          />
        </SubRegionCategoryCard>
        <SubRegionCategoryCard></SubRegionCategoryCard>
        <SubRegionCategoryCard></SubRegionCategoryCard>
        <SubRegionCategoryCard></SubRegionCategoryCard>
        <SubRegionCategoryCard></SubRegionCategoryCard>
      </SubRegionCategories>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// 지역별 카테고리
const RegionCategoryContainer = styled.section`
  width: 60%;
  height: 120px;
  padding: 1rem;
  background-color: grey;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const CategoriesTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
`;

const RegionCategories = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const RegionCategory = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background-color: lightgrey;
  text-align: center;
  line-height: 60px;
`;

// 테마 카테고리

const ThemeCategories = styled.div`
  background-color: lightgrey;
  width: 60%;
  height: 60px;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const ThemeCategory = styled.div`
  padding: 0.3rem;
  background-color: white;
  border-radius: 5px;
`;

// 시군구별 카테고리

const SubRegionCategories = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 40px;
  width: 60%;
  height: 500px;
  background-color: #bfbfbf;
  margin: 0 auto;
  padding: 2rem;
`;

const SubRegionCategoryCard = styled.div`
  background-color: white;
  border-radius: 10px;
`;

const SubRegionCategoryCardImg = styled.img`
  width: 80px;
  height: 100px;
  object-fit: cover;
`;
