import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TopCityBanner = () => {
  const navigate = useNavigate();

  return (
    <TopCityCategoryContainer>
      <CategoriesTitle>인기 도시</CategoriesTitle>
      <TopCityCategories>
        <p>부산</p>
        <TopCityCategory
          onClick={() => navigate(`/`)}
          src={require('@/assets/CityImage/1.jpg').default}
          alt="부산"
        />
        <p>제주</p>
        <TopCityCategory
          onClick={() => navigate(`/`)}
          src={require('@/assets/banner_02.jpg').default}
          alt="제주"
        />
        <p>춘천</p>
        <TopCityCategory
          onClick={() => navigate(`/`)}
          src={require('@/assets/banner_02.jpg').default}
          alt="춘천"
        />
      </TopCityCategories>
    </TopCityCategoryContainer>
  );
};

export default TopCityBanner;

// 인기도시
const TopCityCategoryContainer = styled.section`
  width: 60%;
  height: 350px;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const CategoriesTitle = styled.h1`
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
