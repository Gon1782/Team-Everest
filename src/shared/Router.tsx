import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout/Layout';
import MainPage from '@/pages/Main/MainPage';
import CityDetailPage from '@/pages/CityDetail/CityDetailPage';

const DetailPage = lazy(() => import('@/pages/Detail/DetailPage'));
const CityMapPage = lazy(() => import('@/pages/CityMap/CityMapPage'));
const Mypage = lazy(() => import('@/pages/Mypage/Mypage'));
const Login = lazy(() => import('@/pages/Login/Login'));
const SearchArea = lazy(() => import('@/pages/SearchArea'));
const MyPlanner = lazy(() => import('@/pages/Myplanner/MyPlanner'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/citymap" element={<CityMapPage />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route
            path="/planner/:userId/:planUniqueId"
            element={<MyPlanner />}
          />
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
