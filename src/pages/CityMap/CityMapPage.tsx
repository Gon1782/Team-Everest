import * as Style from './CityMapPageStyled';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Citymap from '@/components/Citymap/Citymap';
import { locationData, themeData } from '@/common/api/categoryApi';

interface StatusType {
  isLoading: boolean;
  isError: boolean;
}

type ErrorType<T> = {
  error: T | unknown;
};

const CityMapPage = () => {
  const { data, isLoading, refetch } = useQuery('locationData', locationData);

  return (
    <Style.Wrap>
      <Sidebar />
      <Citymap />
    </Style.Wrap>
  );
};

export default CityMapPage;
