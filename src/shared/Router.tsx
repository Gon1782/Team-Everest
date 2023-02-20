import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '@/pages/Landing/Landing';
import DetailPage from '@/pages/Detail/DetailPage';
import MainPage from '@/pages/Main/MainPage';
import MyPlan from '@/components/MyPlan/Main';
import Mypage from '@/pages/Mypage/Mypage';
import Login from '@/pages/Login/Login';
import SearchArea from '@/pages/SearchArea';
import CityMapPage from '@/pages/CityMap/CityMapPage';
import Layout from '@/pages/Layout/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/planner/:userId/:planIndex" element={<MyPlan />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my" element={<Mypage />} />
          <Route path="/searcharea" element={<SearchArea />} />
          <Route path="/citymap" element={<CityMapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
