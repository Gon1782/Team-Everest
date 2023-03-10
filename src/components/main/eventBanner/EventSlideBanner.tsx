import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './EventSlideBanner.css';
import { useEffect } from 'react';

const EventSlideBanner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SlideWrapper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        // spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        observer={true}
        observeParents={true}
        autoHeight={true}
        // 자동 높이 조절 -> 배너 사이즈 따라 체크하기
        resistance={false}
      >
        <SlideBanner>
          <Link
            to="https://www.changwon.go.kr/depart/contents.do?mId=1101010000"
            target="_blank"
          >
            <img
              src={require('@/assets/Main_Event/event_banner_01.webp').default}
              alt="진해 군항제"
            />
          </Link>
          　
        </SlideBanner>
        <SlideBanner>
          <Link to="http://www.koreaflowerpark.com/" target="_blank">
            <img
              src={require('@/assets/Main_Event/event_banner_02.webp').default}
              alt="태안 세계튤립꽃박람회"
            />
          </Link>
          　
        </SlideBanner>
        <SlideBanner>
          <Link
            to="https://morningcalm.co.kr/html/preview02.php"
            target="_blank"
          >
            <img
              src={require('@/assets/Main_Event/event_banner_03.webp').default}
              alt="오색별빛정원전"
            />
          </Link>
          　
        </SlideBanner>
        <SlideBanner>
          <Link to="https://korearf.kpipa.or.kr/" target="_blank">
            <img
              src={require('@/assets/Main_Event/event_banner_04.webp').default}
              alt="대한민국 독서대전"
            />
          </Link>
          　
        </SlideBanner>
      </SlideWrapper>
    </>
  );
};

export default EventSlideBanner;

const SlideWrapper = styled(Swiper)`
  width: 100%;
  height: 450px;
`;

const SlideBanner = styled(SwiperSlide)`
  width: 100%;
  img {
    width: 100%;
  }
  a {
    width: 100%;
    height: 450px;
  }
  top: 0;
`;
