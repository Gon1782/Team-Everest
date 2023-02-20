import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './EventSlideBanner.css';

const EventSlideBanner = () => {
  return (
    <>
      <Swiper
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
        // autoHeight={true}
        // 자동 높이 조절 -> 배너 사이즈 따라 체크하기
        resistance={false}
      >
        <SlideBanner>
          <Link to="http://www.koreaflowerpark.com/" target="_blank">
            <img
              src={require('@/assets/banner_01.jpg').default}
              alt="slide banner1"
            />
          </Link>
          　
        </SlideBanner>
        <SlideBanner>
          <Link to="https://seoulland.co.kr/?p=11_view&idx=41" target="_blank">
            <img
              src={require('@/assets/banner_02.jpg').default}
              alt="slide banner2"
            />
          </Link>
          　
        </SlideBanner>
        <SlideBanner>
          <Link to="" target="_blank">
            <img
              src={require('@/assets/banner_03.jpg').default}
              alt="slide banner3"
            />
          </Link>
          　
        </SlideBanner>
        <SlideBanner>
          <Link to="" target="_blank">
            <img
              src={require('@/assets/banner_04.jpg').default}
              alt="slide banner4"
            />
          </Link>
          　
        </SlideBanner>
      </Swiper>
    </>
  );
};

export default EventSlideBanner;

const SlideBanner = styled(SwiperSlide)`
  width: 100%;
  height: 450px;
  img {
    width: 100%;
  }
`;
