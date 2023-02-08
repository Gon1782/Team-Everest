import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <HeaderLogo>
          <NavBarLink to="">Landing</NavBarLink>
        </HeaderLogo>
        <RightSection>
          <NavBarLink to="">Main</NavBarLink>
          <NavBarLink to="">Map</NavBarLink>
          <NavBarLink to="">Calendar</NavBarLink>
          <NavBarLink to="">Detail</NavBarLink>
          <NavBarLink to="">Mypage</NavBarLink>
          <NavBarLink to="">LogIn</NavBarLink>
          <NavBarLink to="">SignUp</NavBarLink>
        </RightSection>
      </Nav>
    </HeaderContainer>
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
