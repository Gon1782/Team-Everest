import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // 검색창 토글 외부 영역 클릭시 창 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuToggled(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* 기본 헤더 메뉴 */}
      <HeaderContainer>
        <Nav>
          <HeaderLogo>
            {/* 로고 */}
            <NavBarLink to="">Landing</NavBarLink>
          </HeaderLogo>
          <RightSection>
            <NavBarLink to="/main">여행 시작하기</NavBarLink>
            <NavBarLink to="/myPlan">일정 만들기</NavBarLink>
            <NavBarLink to="">지도로 이동하기</NavBarLink>
            <NavBarLink to="my">마이페이지</NavBarLink>
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              돋보기
            </button>
            <NavBarLink to="/login">로그인</NavBarLink>
          </RightSection>
        </Nav>
      </HeaderContainer>
      {/* 검색창 토글 */}
      {isMenuToggled && (
        <div ref={menuRef}>
          <SearchScreen>
            <SearchForm>
              <SearchInput></SearchInput>
              <SearchButton>검색</SearchButton>
            </SearchForm>
          </SearchScreen>
        </div>
      )}
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: grey;
  color: white;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
`;

const HeaderLogo = styled.div``;

const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const NavBarLink = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

const SearchScreen = styled.div`
  width: 100%;
  height: 200px;
  background-color: #d6d6d6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form``;

const SearchInput = styled.input``;

const SearchButton = styled.button``;
