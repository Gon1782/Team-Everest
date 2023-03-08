import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '@/pages/Landing/Landing';
import Layout from '@/pages/Layout/Layout';

const DetailPage = lazy(() => import('@/pages/Detail/DetailPage'));
const MainPage = lazy(() => import('@/pages/Main/MainPage'));
const CityMapPage = lazy(() => import('@/pages/CityMap/CityMapPage'));
const CityDetailPage = lazy(() => import('@/pages/CityDetail/CityDetailPage'));
const Mypage = lazy(() => import('@/pages/Mypage/Mypage'));
const Login = lazy(() => import('@/pages/Login/Login'));
const SearchArea = lazy(() => import('@/pages/SearchArea'));
const MyPlan = lazy(() => import('@/components/MyPlan/Main'));
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
