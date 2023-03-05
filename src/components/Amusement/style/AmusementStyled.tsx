import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const AmusementInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 889px;
  background-color: #9db9ff;
  gap: 3rem;
`;
export const AmusementInfoHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
export const AmusementInfoSubHeader = styled.h3`
  color: #002074;
  font-size: 23px;
`;
export const AmusementInfoTitle = styled.h2`
  color: #202020;
  font-size: 35px;
  line-height: 40px;
`;
export const AmusementInfoBox = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 30px;
`;
export const AmusementImg = styled.img`
  width: 100%;
  height: 257px;
  border-radius: 30px 30px 0 0;
`;
export const AmusementInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 240px;
  padding: 0 0.75rem;
  gap: 1rem;
  background-color: white;
  border-radius: 30px;
`;
export const AmusementTitle = styled.span`
  font-size: 25;
  word-break: 'keep-all';
`;
export const AmuseCategory = styled.span`
  color: #535353;
  font-size: 18;
`;
export const AmuseRating = styled.div`
  display: flex;
  gap: 0.5rem;
  & svg {
    color: #0039cb;
    font-size: 24px;
  }
`;
export const AmusePlace = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AmuseLocation = styled.span`
  color: #0034b9;
  font-size: 14px;
`;
export const AmuseAddr = styled.span`
  color: #5a5a5a;
  word-break: keep-all;
  font-size: 14px;
`;
export const SwiperSlideStyle = styled(SwiperSlide)`
  width: 320px;
  height: 500px;
  border-radius: 30px;
  opacity: 0.6;
  &.swiper-slide-prev {
    opacity: 0.9;
  }
  &.swiper-slide-active {
    opacity: 1;
  }
  &.swiper-slide-next {
    opacity: 0.9;
  }
`;
