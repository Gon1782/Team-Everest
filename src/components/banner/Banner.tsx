import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Banner = () => {
  return (
    <BannerContainer>
      <BannerBgWrapper>
        <BannerBg src={require('@/assets/banner_bg.jpg').default} alt=" " />
      </BannerBgWrapper>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
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
  height: 300px;
  overflow: hidden;
  position: absolute;
  object-fit: cover;
`;
