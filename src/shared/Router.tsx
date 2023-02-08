import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
