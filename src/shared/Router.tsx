import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/header/Header';
import Landing from '@/pages/Landing';
import DetailPage from '@/pages/Detail/DetailPage';
import MainPage from '@/pages/Main/MainPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<CalenderView />}></Route> */}
        <Route path="/" element={<Landing />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
