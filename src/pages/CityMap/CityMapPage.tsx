import Sidebar from '@/components/Citymap/Sidebar/Sidebar';
import Citymap from '@/components/Citymap/Citymap';
import * as S from './style/CityMapPageStyled';

const CityMapPage = () => {
  return (
    <S.Wrap>
      <Citymap />
    </S.Wrap>
  );
};

export default CityMapPage;
