import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
      {/* children 대신 사용가능한 라이브러리, 상위 컴포넌트를 레이아웃화 해줌 */}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 0px;
`;
