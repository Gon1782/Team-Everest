import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/common/api/firebase';
import { Document } from '@/types/DetailType';

const TopCityBanner = () => {
  const [topCities, setTopCities] = useState<Document>([]);
  const navigate = useNavigate();

  // 인기 도시 DB 불러오기
  const getTopCities = async () => {
    const citiesRef = collection(db, 'cities');
    const q = query(citiesRef, orderBy('reviewCount', 'desc'), limit(3));

    const getListSnapshot = await getDocs(q);
    const list: any = [];
    getListSnapshot.forEach((doc) => {
      list.push(doc.data());
      setTopCities(list);
    });
  };

  // 시군구 코드 체크
  const checkNavigatePath = (v: any) => {
    if (v.areaCode && v.sigunguCode) {
      return `${v.areaCode}/${v.sigunguCode}`;
    } else {
      return v.areaCode;
    }
  };

  useEffect(() => {
    getTopCities();
  }, []);

  return (
    <TopCityCategoryContainer>
      <CategoriesTitle>인기 도시</CategoriesTitle>

      <TopCityCategories>
        {topCities.map((v: any, i: number) => (
          <TopCityItem key={i}>
            <TopCitySlogan>{v.slogan}</TopCitySlogan>
            <TopCityCategory
              onClick={() => {
                const pathCode = checkNavigatePath(v);
                navigate(`/citydetail/${pathCode}`);
              }}
              src={v.image}
              alt={v.name}
            />
          </TopCityItem>
        ))}
      </TopCityCategories>
    </TopCityCategoryContainer>
  );
};

export default TopCityBanner;

// 인기도시
const TopCityCategoryContainer = styled.section`
  width: 80%;
  height: 400px;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-top: 80px;
`;

const CategoriesTitle = styled.h1`
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

const TopCityItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const TopCitySlogan = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f2f2f2;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: 0px;
  // gradient
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  text-align: center;
  line-height: 60px;
`;

const TopCityCategory = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  text-align: center;
  line-height: 28px;
  font-size: 0.9rem;
  object-fit: cover;
`;
