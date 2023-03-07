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
import CityDetailPage from '@/pages/CityDetail/CityDetailPage';
import NotFound from '@/pages/NotFound';
import Error from '@/pages/Error';
const Router = () => {
  //  errorElement={<NotFound />}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/citymap" element={<CityMapPage />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/planner/:userId/:planUniqueId" element={<MyPlan />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/my" element={<Mypage />} />
          <Route path="/searcharea" element={<SearchArea />} />
          <Route
            path="/citydetail/:areaCode/:sigunguCode?"
            element={<CityDetailPage />}
          />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
