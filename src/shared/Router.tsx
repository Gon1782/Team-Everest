import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/header/Header';
import Landing from '@/pages/Landing';
import DetailPage from '@/pages/Detail/DetailPage';
import MainPage from '@/pages/Main/MainPage';
import ScheduleList from '@/components/calender/ScheduleList';
import CityMapPage from '@/pages/CityMap/CityMapPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<ScheduleList />}></Route> */}
        <Route path="/" element={<Landing />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/citymap" element={<CityMapPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
