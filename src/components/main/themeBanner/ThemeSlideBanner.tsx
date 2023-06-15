import { HashTagCategory } from '../../../types/ThemeType';
import { listItems } from '../../../common/utils/themeInfo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
// SwiperCore - 타입 지정시 필요함
import styled, { css } from 'styled-components';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './ThemeSlideBanner.css';

const ThemeSlideBanner = () => {
  // 선택 카테고리 state - 선택한 카테고리 없을 시 첫 번째 태그 리스트 보임
  const [selectedCategory, setSelectedCategory] =
    useState<HashTagCategory | null>('#이색 체험');
  // Swiper 구성요소 인스턴스 할당
  const [swiper, setSwiper] = useState<SwiperCore>();

  // 테마 카테고리
  const [activeCategory, setActiveCategory] = useState<string | null>(
    '#이색 체험',
  );
  // 테마 리스트
  const [activeList, setActiveList] = useState<string | null>(null);

  // 카테고리 선택시 state 업데이트
  const categorySelectHandler = (category: HashTagCategory) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  // 카테고리 선택시 state 업데이트
  const listSelectHandler = (title: string) => {
    const focus = title === activeList ? true : false;
  };

  // 선택한 카테고리와 같은 리스트 항목 보여주기
  const filteredListItems = selectedCategory
    ? listItems.filter((item) => item.category === selectedCategory)
    : listItems;

  //  선택한 리스트 항목에 해당하는 슬라이드 배너로 포커스 이동해주기
  const listClickHandler = (index: any, title: string) => {
    const idx = index - 1;
    if (swiper) {
      swiper.slideTo(idx, 1000); //  해당 인덱스로 이동한다.
      setActiveList(title);
    }
  };
  {
    /* 리팩토링 예정 */
  }

  return (
    <ThemeContainer>
      <ThemeHashtagCategoriesWrapper>
        <ThemeCategoriesTitle>테마가 있는 명소</ThemeCategoriesTitle>

        <ThemeHashtagCategories>
          <ThemeHashTagCategory
            onClick={() => categorySelectHandler('#이색 체험')}
            style={activeCategory === '#이색 체험' ? activeCategoryStyle : {}}
          >
            #이색 체험
          </ThemeHashTagCategory>
          <ThemeHashTagCategory
            onClick={() =>
              categorySelectHandler('#자연을 찾아 떠나는 자유여행')
            }
            style={
              activeCategory === '#자연을 찾아 떠나는 자유여행'
                ? activeCategoryStyle
                : {}
            }
          >
            #자연을 찾아 떠나는 자유여행
          </ThemeHashTagCategory>
          <ThemeHashTagCategory
            onClick={() => categorySelectHandler('#데이트 장소')}
            style={activeCategory === '#데이트 장소' ? activeCategoryStyle : {}}
          >
            #데이트 장소
          </ThemeHashTagCategory>
          <ThemeHashTagCategory
            onClick={() => categorySelectHandler('#국내에서 즐기는 해외여행')}
            style={
              activeCategory === '# 국내에서 즐기는 해외여행'
                ? activeCategoryStyle
                : {}
            }
          >
            #국내에서 즐기는 해외여행
          </ThemeHashTagCategory>
        </ThemeHashtagCategories>
      </ThemeHashtagCategoriesWrapper>
      {/* 좌측 카테고리 리스트 */}
      <ThemelistItems>
        <ThemelistItemsTitleWrapper>
          <ThemelistItemsTitles>
            {filteredListItems.map((item, index) => (
              <ThemelistItemsTitle
                key={item.id}
                onClick={() => listClickHandler(index, item.title)}
                style={activeList === item.title ? activeListStyle : {}}
              >
                {item.title}
              </ThemelistItemsTitle>
            ))}
          </ThemelistItemsTitles>
        </ThemelistItemsTitleWrapper>
        {/* 우측 이미지 카드 리스트 */}
        <SlideBannerWrapper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={20}
          slidesPerView={3}
          observer={true}
          observeParents={true}
          // observer - 스타일 변경/하위 요소 수정시 업데이트(초기화)됨
          resistance={false}
          watchOverflow={true}
          onSwiper={setSwiper}
          // onSwipre - 외부에서 스와이퍼를 변경하고자 할 때 사용, 스와이퍼 인스턴스를 state로 할당
          onSlideChange={(swiper) => setSwiper(swiper)}
        >
          <ThemelistItemsImages>
            {filteredListItems.map((item) => (
              <SlideBanner key={item.id}>
                <Link to={`/detail/${item.contentId}`}>
                  <ThemelistItemsImage
                    src={require(`@/assets/Main_Theme/${item.id}.webp`).default}
                    alt={`slide banner ${item.id}`}
                  />
                </Link>
              </SlideBanner>
            ))}
          </ThemelistItemsImages>
        </SlideBannerWrapper>
      </ThemelistItems>
    </ThemeContainer>
  );
};

export default ThemeSlideBanner;

// 스타일 객체
const activeCategoryStyle = {
  fontWeight: 'bold',
  color: '#2871A3',
};

const activeListStyle = {
  color: '#f2f2f2',
  backgroundColor: '#2871A3',
};

// 테마 명소

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 80px;
  @media screen and (max-width: 1280px) {
    width: 100%;
    height: 400px;
    margin-bottom: 200px;
  }
`;

// 해시 태그 카테고리
const ThemeHashtagCategoriesWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 200px;
`;

const ThemeCategoriesTitle = styled.h1`
  margin-bottom: 64px;
`;

const ThemeHashtagCategories = styled.ul`
  width: 80%;
  display: flex;
  justify-content: space-around;
  gap: 30px;
  margin-bottom: 48px;
`;

const ThemeHashTagCategory = styled.li`
  font-size: 1.8rem;
  word-break: break-all;
  font-weight: 900;
  color: #7b7b7b;
  :hover {
    cursor: pointer;
    color: #2871a3;
  }
`;

const ThemelistItems = styled.div`
  display: flex;
  width: 100%;
  height: 560px;
  cursor: pointer;
`;

const ThemelistItemsTitleWrapper = styled.div`
  width: 100%;
  padding-left: 20px;
`;

const ThemelistItemsTitles = styled.ul`
  height: 100%;
  border-top: 1px solid #d7d7d7;
`;

const ThemelistItemsTitle = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% / 6);
  font-size: 1.4rem;
  font-weight: 600;
  padding: 30px;
  border-bottom: 1px solid #d7d7d7;
  transition: all 0.35s;
  &:hover {
    background-color: #2871a3;
    color: #f2f2f2;
  }
`;

// 이미지 리스트

const ThemelistItemsImages = styled.ul`
  width: 250%;
`;

const SlideBannerWrapper = styled(Swiper)`
  width: 250%;
`;

const SlideBanner = styled(SwiperSlide)`
  /* width: 100%; */
  width: 420px;
  height: 560px;
`;

const ThemelistItemsImage = styled.img`
  /* width: 100%; */
  width: 420px;
  height: 560px;
  object-fit: cover;
  border-radius: 10px;
  @media screen and (max-width: 1280px) {
    width: 100%;
    height: 400px;
  }
`;
