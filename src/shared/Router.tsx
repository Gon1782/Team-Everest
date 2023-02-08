import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import CalenderView from '../components/calender/CalenderView';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<CalenderView />}></Route> */}
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
