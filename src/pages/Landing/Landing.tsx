import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <Container>
      <InfoSection>
        <Logo
          src={require('@/assets/Logo/sharpa_logo_01.webp').default}
          alt="slide banner4"
        />
        {/* <LogoText>SHARPA</LogoText> */}
        <Title>여행 스케줄링 플래너</Title>
        <StartBtn to="/main">시작하기</StartBtn>
      </InfoSection>
      <ReactPlayer
        className="react-player"
        url={require('@/assets/Landing/Landing_video.mp4').default} // 플레이어 url
        width={'100%'}
        height={'auto'}
        playing={true} // 자동 재생 on
        muted={true}
        loop={true}
        style={{ position: 'absolute' }}
      />
    </Container>
  );
};

export default Landing;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow-y: hidden;
`;

const InfoSection = styled.div`
  width: 40%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 15px;
`;

const LogoText = styled.h1`
  font-size: 3rem;
  color: #fff;
  transform: translateY(-15px);
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 200;
  /* letter-spacing: -2px; */
  color: #fff;
`;

const StartBtn = styled(NavLink)`
  text-decoration: none;
  background-color: #112d4e;
  width: 150px;
  height: 50px;
  font-size: 1.2rem;
  color: white;
  line-height: 50px;
  text-align: center;
  margin-top: 35px;
  border-radius: 50px;
  transition: all 0.25;
  &:hover {
    background-color: #06309b;
  }
`;
