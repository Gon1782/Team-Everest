import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from '@/pages/Landing';
import DetailPage from '@/pages/Detail/DetailPage';
import Header from '@/components/header/Header';
import CalenderView from '@/components/calender/CalenderView';
import MainPage from '@/pages/Main/MainPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<CalenderView />}></Route> */}
        <Route path="/" element={<Landing />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
