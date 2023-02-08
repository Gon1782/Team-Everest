import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Banner = () => {
  return (
    <BannerContainer>
      <InfoSection>
        <BannerTitle>지역이름</BannerTitle>
        <BannerDesc>지역에 대한 소개입니다.</BannerDesc>
        <GoDetailBtn to="">바로가기</GoDetailBtn>
      </InfoSection>
      <BannerBgWrapper>
        <BannerBg src={require('@/assets/banner_bg.jpg').default} alt=" " />
      </BannerBgWrapper>
      <BannerCards>
        <BannerCardWarpper>
          <BannerCardTitle>지역이름</BannerCardTitle>
          <BannerCard
            src={require('@/assets/banner_card_01.jpg').default}
            alt=""
          />
        </BannerCardWarpper>
        <BannerCardWarpper>
          <BannerCardTitle>지역이름</BannerCardTitle>
          <BannerCard
            src={require('@/assets/banner_card_01.jpg').default}
            alt=""
          />
        </BannerCardWarpper>
        <BannerCardWarpper>
          <BannerCardTitle>지역이름</BannerCardTitle>
          <BannerCard
            src={require('@/assets/banner_card_01.jpg').default}
            alt=""
          />
        </BannerCardWarpper>
        <BannerCardWarpper>
          <BannerCardTitle>지역이름</BannerCardTitle>
          <BannerCard
            src={require('@/assets/banner_card_01.jpg').default}
            alt=""
          />
        </BannerCardWarpper>
        <BannerCardWarpper>
          <BannerCardTitle>지역이름</BannerCardTitle>
          <BannerCard
            src={require('@/assets/banner_card_01.jpg').default}
            alt=""
          />
        </BannerCardWarpper>
      </BannerCards>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`;

const InfoSection = styled.section`
  height: 40vh;
  width: 30%;
  position: absolute;
  bottom: 50px;
  left: 35px;
  z-index: 999;
`;

const BannerTitle = styled.h1`
  margin-bottom: 30px;
  font-weight: 900;
  font-size: 2rem;
  color: white;
`;

const BannerDesc = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
  color: white;
`;

const GoDetailBtn = styled(Link)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  text-decoration: none;
  background-color: grey;
  color: white;
  border-radius: 5px;
  padding: 5px;
`;

const BannerBgWrapper = styled.div`
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.0001) 100%);
    mix-blend-mode: normal;
    opacity: 0.6;
  }
`;

const BannerBg = styled.img`
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: absolute;
  height: 500px;
  object-fit: cover;
`;

const BannerCards = styled.div`
  position: absolute;
  width: 30%;
  height: 100px;
  bottom: 20px;
  right: -150px;
  display: flex;
  justify-content: space-around;
`;

const BannerCardWarpper = styled.div`
  position: relative;
  height: 100%;
`;

const BannerCard = styled.img`
  width: 80px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
`;

const BannerCardTitle = styled.p`
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
`;
