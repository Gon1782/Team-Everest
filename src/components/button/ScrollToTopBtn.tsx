import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ScrollToTopBtn = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // 버튼 클릭 시 화면 최상단으로 올라가기
  const scrollToTopBtnHandler = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 화면에서 스크롤 내리면 버튼 보이기
  const ShowTopBtnHandler = () => {
    if (window.scrollY > 250) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    ShowTopBtnHandler();
    window.addEventListener('scroll', ShowTopBtnHandler);
    return () => {
      window.removeEventListener('scroll', ShowTopBtnHandler);
    };
  }, []);

  return (
    <>
      {showTopButton && (
        <TopButton onClick={scrollToTopBtnHandler}>Top</TopButton>
      )}
    </>
  );
};

export default ScrollToTopBtn;

const TopButton = styled.button`
  width: 50px;
  height: 50px;
  bottom: 50px;
  right: 30px;
  position: fixed;
  background-color: cornflowerblue;
  color: white;
  z-index: 1;
  border-radius: 100px;
  text-align: center;
  cursor: pointer;
`;
