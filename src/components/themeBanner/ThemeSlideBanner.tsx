import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// 해시태그 카테고리 타입
type HashTagCategory =
  | '# 이색 체험'
  | '# 자연을 찾아 떠나는 자유여행'
  | '# 데이트 장소'
  | '# 국내에서 즐기는 해외여행';

// 카테고리 선택시 보여지는 리스트 타입
interface ListItem {
  id: number;
  title: string;
  category: HashTagCategory;
  url: string;
}

// 리스트 아이템 데이터
const listItems: ListItem[] = [
  {
    id: 1,
    category: '# 이색 체험',
    title: '# 성주 경비행기',
    url: 'https://image.aladin.co.kr/product/28582/75/cover500/k482831619_1.jpg',
  },
  {
    id: 2,
    category: '# 이색 체험',
    title: '# 동두천 니지모리 스튜디오',
    url: 'https://image.aladin.co.kr/product/27611/96/cover500/k282733024_1.jpg',
  },
  {
    id: 3,
    category: '# 이색 체험',
    title: '# 인제 스피디움',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 4,
    category: '# 이색 체험',
    title: '# 고창 상하농원',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 5,
    category: '# 이색 체험',
    title: '# 고창 상하농원',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 6,
    category: '# 이색 체험',
    title: '# 단양 패러글라이딩',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 7,
    category: '# 자연을 찾아 떠나는 자유여행',
    title: '# 제주 오름 투어 ',
    url: 'https://image.aladin.co.kr/product/28582/75/cover500/k482831619_1.jpg',
  },
  {
    id: 8,
    category: '# 자연을 찾아 떠나는 자유여행',
    title: '# 거제 가라산',
    url: 'https://image.aladin.co.kr/product/27611/96/cover500/k282733024_1.jpg',
  },
  {
    id: 9,
    category: '# 자연을 찾아 떠나는 자유여행',
    title: '# 태백산 눈꽃축제',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 10,
    category: '# 자연을 찾아 떠나는 자유여행',
    title: '# 부산 감천항',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 11,
    category: '# 자연을 찾아 떠나는 자유여행',
    title: '# 화성 제부도',
    url: 'https://image.aladin.co.kr/product/28582/75/cover500/k482831619_1.jpg',
  },
  {
    id: 12,
    category: '# 자연을 찾아 떠나는 자유여행',
    title: '# 강천산 군립공원',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 13,
    category: '# 데이트 장소',
    title: '# 한남동 해방촌',
    url: 'https://image.aladin.co.kr/product/28582/75/cover500/k482831619_1.jpg',
  },
  {
    id: 14,
    category: '# 데이트 장소',
    title: '# 잠실 롯데월드',
    url: 'https://image.aladin.co.kr/product/27611/96/cover500/k282733024_1.jpg',
  },
  {
    id: 15,
    category: '# 데이트 장소',
    title: '# 춘천 남이섬',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 16,
    category: '# 데이트 장소',
    title: '# 여의도 한강공원',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 17,
    category: '# 데이트 장소',
    title: '# 서울숲 & 성수',
    url: 'https://image.aladin.co.kr/product/28582/75/cover500/k482831619_1.jpg',
  },
  {
    id: 18,
    category: '# 데이트 장소',
    title: '# 이니스프리 제주신화월드점',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 19,
    category: '# 국내에서 즐기는 해외여행',
    title: '# 가평 쁘티 프랑스',
    url: 'https://image.aladin.co.kr/product/28582/75/cover500/k482831619_1.jpg',
  },
  {
    id: 20,
    category: '# 국내에서 즐기는 해외여행',
    title: '# 남해 독일마을',
    url: 'https://image.aladin.co.kr/product/27611/96/cover500/k282733024_1.jpg',
  },
  {
    id: 21,
    category: '# 국내에서 즐기는 해외여행',
    title: '# 인천 차이나타운',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 22,
    category: '# 국내에서 즐기는 해외여행',
    title: '# 가평 이탈리아마을',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 23,
    category: '# 국내에서 즐기는 해외여행',
    title: '# 아산 지중해마을',
    url: 'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg',
  },
  {
    id: 24,
    category: '# 국내에서 즐기는 해외여행',
    title: '# 구룡포 일본인 가옥거리',
    url: 'https://image.aladin.co.kr/product/27611/96/cover500/k282733024_1.jpg',
  },
];

const ThemeSlideBanner = () => {
  // 선택 카테고리 state - 선택한 카테고리 없을 시 첫 번째 태그 리스트 보임
  const [selectedCategory, setSelectedCategory] =
    useState<HashTagCategory | null>('# 이색 체험');

  // 카테고리 선택시 state 업데이트
  const categorySelectHandler = (category: HashTagCategory) => {
    setSelectedCategory(category);
  };

  // 선택한 카테고리와 같은 리스트 항목 보여주기
  const filteredListItems = selectedCategory
    ? listItems.filter((item) => item.category === selectedCategory)
    : listItems;

  return (
    <ThemeContainer>
      <ThemeHashtagCategoriesWrapper>
        <ThemeCategoriesTitle>테마가 있는 명소</ThemeCategoriesTitle>
        <ThemeHashtagCategories>
          <ThemeHashTagCategory
            onClick={() => categorySelectHandler('# 이색 체험')}
          >
            # 이색 체험
          </ThemeHashTagCategory>
          <ThemeHashTagCategory
            onClick={() =>
              categorySelectHandler('# 자연을 찾아 떠나는 자유여행')
            }
          >
            # 자연을 찾아 떠나는 자유여행
          </ThemeHashTagCategory>
          <ThemeHashTagCategory
            onClick={() => categorySelectHandler('# 데이트 장소')}
          >
            # 데이트 장소
          </ThemeHashTagCategory>
          <ThemeHashTagCategory
            onClick={() => categorySelectHandler('# 국내에서 즐기는 해외여행')}
          >
            # 국내에서 즐기는 해외여행
          </ThemeHashTagCategory>
        </ThemeHashtagCategories>
      </ThemeHashtagCategoriesWrapper>
      {/* 좌측 카테고리 리스트 */}

      <ThemelistItems>
        <ThemelistItemsTitleWrapper>
          <ThemelistItemsTitles>
            {filteredListItems.map((item) => (
              <ThemelistItemsTitle key={item.id}>
                {item.title}
              </ThemelistItemsTitle>
            ))}
          </ThemelistItemsTitles>
        </ThemelistItemsTitleWrapper>
        {/* 우측 이미지 카드 리스트 */}
        <ThemelistItemsImages>
          {filteredListItems.map((item) => (
            <ThemelistItemsImageCard key={item.id}>
              <Link to="">
                <ThemelistItemsImage src={item.url} alt="" />
              </Link>
            </ThemelistItemsImageCard>
          ))}
        </ThemelistItemsImages>
      </ThemelistItems>
    </ThemeContainer>
  );
};

export default ThemeSlideBanner;

// 테마 명소

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  width: 100%;
  background-color: #9f9ff2;
`;

const ThemeHashtagCategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 200px;
`;

const ThemeCategoriesTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 900;
  margin-bottom: 30px;
`;

const ThemeHashtagCategories = styled.ul`
  display: flex;
  gap: 40px;
`;

const ThemeHashTagCategory = styled.li`
  font-size: 1.8rem;
  font-weight: 900;
  cursor: pointer;
  :hover {
    color: #5a5a5a;
  }
`;

const ThemelistItems = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
  background-color: grey;
`;

const ThemelistItemsTitleWrapper = styled.div`
  width: 25%;
  background-color: #e0e0db;
`;

const ThemelistItemsTitles = styled.ul`
  height: 100%;
  border-top: 1px solid #767676;
`;

const ThemelistItemsTitle = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% / 6);
  font-size: 1.4rem;
  font-weight: 600;
  padding: 30px;
  border-bottom: 1px solid #767676;
`;

const ThemelistItemsImages = styled.ul`
  width: 75%;
  height: 600px;
  display: flex;
  overflow: hidden;
`;

const ThemelistItemsImageCard = styled.li`
  background-color: #d4d4d4;
  height: 600px;
`;

const ThemelistItemsImage = styled.img`
  width: 400px;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
`;
