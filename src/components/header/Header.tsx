import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import SearchModal from './SearchModal';
import { auth } from '../../common/api/firebase';
import { onAuthStateChanged } from '@firebase/auth';
import useModal from '@/hooks/useModal';
import ScrollToTopBtn from '@/components/button/ScrollToTopBtn';

const Header = () => {
  // 검색창 토글
  const [logoutText, setLogoutText] = useState(true);
  const [uid, setUid] = useState('');
  const navigate = useNavigate();

  // 모달 기능
  const [modal, openModal, closeModal, closeModalIfClickOutside] = useModal();

  const modalOpen = () => {
    openModal();
  };

  // 로그인 상태 체크 후 연결 페이지 설정
  const LoginOutHandler = () => {
    if (logoutText === false) {
      if (window.confirm('로그아웃 하시겠습니까?')) {
        auth.signOut();
        alert('로그아웃 되셨습니다.');
        navigate('/');
      }
      return;
    } else {
      navigate('login');
    }
  };

  // 로그인 상태 체크 후 텍스트 state 변경
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogoutText(false);
        setUid(user.uid);
      } else if (!user) {
        setLogoutText(true);
      }
    });
  }, []);

  return (
    <>
      {/* 기본 헤더 메뉴 */}
      <HeaderContainer>
        {modal && (
          <SearchModal
            closeModal={closeModal}
            closeModalIfClickOutside={closeModalIfClickOutside}
          />
        )}
        <Nav>
          <HeaderLogo onClick={() => navigate('/main')}>
            <img
              src={require('@/assets/Logo/sharpa_logo_02.webp').default}
              style={{ width: 100, height: 'auto', marginTop: 20 }}
            />
          </HeaderLogo>
          <MenuSection onClick={() => closeModal()}>
            <NavBarLink to="/main">여행 시작하기</NavBarLink>
            &#183;
            <NavBarLink to="/citymap">지도로 이동하기</NavBarLink>
            &#183;
            <NavBarLink to="/planner/my/write">일정 만들기</NavBarLink>
            &#183;
            <NavBarLink to="my">마이페이지</NavBarLink>
          </MenuSection>
          <RightSection>
            <SearchIconWrapper onClick={() => modalOpen()}>
              <SearchIcon />
            </SearchIconWrapper>
            <LogInButton onClick={LoginOutHandler}>
              <img
                src={'https://img.icons8.com/windows/64/null/user.png'}
                style={{ width: 20, height: 20, marginRight: '5' }}
              />
              <LogoutText>{logoutText ? '로그인' : '로그아웃'}</LogoutText>
            </LogInButton>
          </RightSection>
          {/* <ScrollToTopBtn /> */}
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: #fff;
  color: #151515;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  padding-left: 20px;
  padding-right: 20px;
`;

const HeaderLogo = styled.div`
  line-height: 50px;
`;

const MenuSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 80px;
  width: 100%;
`;

const NavBarLink = styled(NavLink)`
  width: 150px;
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.theme.black};
  font-size: 1rem;
  font-weight: 400;
  padding: 25px 10px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.blue};
    border-bottom: 2px solid ${(props) => props.theme.blue};
  }
`;

// 로그인 버튼

const RightSection = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchIconWrapper = styled.div`
  width: 40px;
  height: 65px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  &:hover {
    color: ${(props) => props.theme.blue};
    border-bottom: 2px solid ${(props) => props.theme.blue};
  }
`;

const SearchIcon = styled(BiSearch)`
  width: 20px;
  height: auto;
`;

const LogInButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 100px;
  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.dimgrey};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;

const LogoutText = styled.p`
  color: ${(props) => props.theme.darkgrey};
  font-size: 0.8rem;
`;
