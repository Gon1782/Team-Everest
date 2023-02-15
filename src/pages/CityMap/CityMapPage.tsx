import * as Style from './CityMapPageStyled';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Citymap from '@/components/Citymap/Citymap';
import { locationData, themeData } from '@/common/api/categoryApi';
import { cityInfo } from '@/common/utils/cityInfo';

const CityMapPage = () => {
  return (
    <Style.Wrap>
      <Sidebar />
      <Citymap />
    </Style.Wrap>
  );
};

export default CityMapPage;
