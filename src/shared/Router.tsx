import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/header/Header';
import Landing from '@/pages/Landing';
import DetailPage from '@/pages/Detail/DetailPage';
import MainPage from '@/pages/Main/MainPage';
import MyPlan from '@/components/calender/Main';
import Mypage from '@/pages/Mypage/Mypage';
import Login from '@/pages/Login/Login';
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/myPlan" element={<MyPlan />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/my" element={<Mypage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
