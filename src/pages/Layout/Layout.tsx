import ScrollTopBtn from '@/components/scrollToTopBtn/ScrollTopBtn';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <ScrollTopBtn />
      <Outlet />
      {/* children 대신 사용가능한 라이브러리, 상위 컴포넌트를 레이아웃화 해줌 */}
    </>
  );
};

export default Layout;
