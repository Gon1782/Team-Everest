import { HashTagCategory } from '../../../types/ThemeType';
import { listItems } from '../../../common/utils/themeInfo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// SwiperCore - 타입 지정시 필요함
import styled from 'styled-components';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './ThemeSlideBanner.css';

const ThemeSlideBanner = () => {
  // 선택 카테고리 state - 선택한 카테고리 없을 시 첫 번째 태그 리스트 보임
  const [selectedCategory, setSelectedCategory] =
    useState<HashTagCategory | null>('# 이색 체험');
  // Swiper 구성요소 인스턴스 할당
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [value, setValue] = useState<any>();

  // 카테고리 선택시 state 업데이트
  const categorySelectHandler = (category: HashTagCategory) => {
    setSelectedCategory(category);
  };

  // 선택한 카테고리와 같은 리스트 항목 보여주기
  const filteredListItems = selectedCategory
    ? listItems.filter((item) => item.category === selectedCategory)
    : listItems;

  // console.log(value);
  // console.log(swiper);
  // console.log('value', value);
  //  선택한 리스트 항목에 해당하는 슬라이드 배너로 포커스 이동해주기
  const listClickHandler = (item: any) => {
    // const listClickHandler = () => {
    const idx = item.id - 1;

    console.log('item.id', item.id);
    if (swiper) {
      swiper.slideTo(idx, 1000); // 1000 - 이동할 때 걸리는 시간
    }
  };

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
              <ThemelistItemsTitle
                key={item.id}
                onClick={() => listClickHandler(item)}
                // onClick={() => listClickHandler()}
              >
                {item.title}
              </ThemelistItemsTitle>
            ))}
          </ThemelistItemsTitles>
        </ThemelistItemsTitleWrapper>
        {/* 우측 이미지 카드 리스트 */}
        <SlideBannerWrapper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          spaceBetween={0}
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
                <Link to="">
                  <ThemelistItemsImage
                    src={item.url}
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

// 테마 명소

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  width: 100%;
  position: relative;
`;

// 해시 태그 카테고리
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
`;

const ThemelistItemsTitleWrapper = styled.div`
  width: 100%;
  padding-left: 20px;
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

// 이미지 리스트

const ThemelistItemsImages = styled.ul``;

const SlideBannerWrapper = styled(Swiper)`
  width: 220%;
`;

const SlideBanner = styled(SwiperSlide)`
  width: 400px;
  height: 600px;
`;

const ThemelistItemsImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 10px;
`;
