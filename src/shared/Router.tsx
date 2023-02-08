import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from '@/pages/Landing';
import DetailPage from '@/pages/Detail/DetailPage';
import Header from '@/components/header/Header';
import CalenderView from '@/components/calender/CalenderView';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        {/* <Route path="/" element={<CalenderView />}></Route> */}
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
