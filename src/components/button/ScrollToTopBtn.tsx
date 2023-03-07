import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ScrollToTopBtn: React.FC = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // 스크롤할 경우 탑 버튼 보이기
  useEffect(() => {
    const showTopBtnHandler = () => {
      if (window.pageYOffset > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener('scroll', showTopBtnHandler);
    return () => {
      window.removeEventListener('scroll', showTopBtnHandler);
    };
  }, []);

  // 탑 버튼 클릭시 화면 상단으로 올리기
  // * y 좌표 0 이 아닐 경우 스크린에서 -scrollY 반복적으로 실행
  const scrollToTopBtnHandler = () => {
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <>
      {showTopButton && (
        <TopButton onClick={scrollToTopBtnHandler}>
          <p>Top</p>
        </TopButton>
      )}
    </>
  );
};

export default ScrollToTopBtn;

const TopButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 9999;
  background-color: cornflowerblue;
  color: #fff;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #4d77c6;
  }

  p {
    font-size: 15px;
    width: 100%;
    margin: 0 auto;
  }
`;
