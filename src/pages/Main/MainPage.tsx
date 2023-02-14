import { auth } from '@/common/api/firebase';
import Banner from '@/components/banner/Banner';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <div>
      <Banner />
    </div>
  );
};

export default MainPage;
