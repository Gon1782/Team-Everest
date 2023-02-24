import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <Container>
      <InfoSection>
        <Logo
          src={require('@/assets/Landing/sherpa_logo.png').default}
          alt="slide banner4"
        />
        <LogoText>SHERPA</LogoText>
        <Title>여행 스케줄링 플래너</Title>
        {/* <StartButton></StartButton> */}
        <StartBtn to="/main">시작하기</StartBtn>
      </InfoSection>
      <VideoSection>
        <LandingVideo
          className="react-player"
          url={require('@/assets/Landing/Landing_video.mp4').default} // 플레이어 url
          width="100%" // 플레이어 크기 (가로)
          height="auto" // 플레이어 크기 (세로)
          playing={true} // 자동 재생 on
          muted={true} // 자동 재생 on
          controls={false} // 플레이어 컨트롤 노출 여부
          light={false} // 플레이어 모드
          pip={true} // pip 모드 설정 여부
          covered={true} //

          // poster={
          //   'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
          // } // 플레이어 초기 포스터 사진
          // onEnded={() => handleVideo()} // 플레이어 끝났을 때 이벤트
        />
      </VideoSection>
    </Container>
  );
};

export default Landing;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #959595;
  display: flex;
`;

const InfoSection = styled.div`
  width: 40%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 15rem;
  height: auto;
`;

const LogoText = styled.h2`
  font-size: 5rem;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  letter-spacing: -2px;
`;

const StartBtn = styled(NavLink)`
  text-decoration: none;
  background-color: #1b8a99;
  width: 280px;
  height: 60px;
  font-size: 1.3rem;
  color: white;
  line-height: 60px;
  text-align: center;
  margin-top: 30px;
`;

const VideoSection = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
`;

const LandingVideo = styled(ReactPlayer)`
  object-fit: cover;
`;
