import Amusement from '../Amusement/Amusement';
import Michelin from '../Michelin/Michelin';
import * as S from './style/CommonStyled';

interface Props {
  name: string;
  city: any;
}

const CitySection = ({ name, city }: Props) => {
  const selector = () => {
    switch (true) {
      case name === 'Michelin':
        return {
          title: '여행에서 맛집이 빠질수 없죠 !',
        };
      case name === 'Amusement':
        return {
          title: `${city.korarea}에서는 이런것도 즐길 수 있어요 !`,
        };
      default:
        return {
          title: '',
        };
    }
  };
  const chosen = selector();

  return (
    <S.CitySection>
      <S.CityTitle>{chosen.title}</S.CityTitle>
      {name === 'Michelin' ? (
        <Michelin areacode={city.areacode} />
      ) : (
        <Amusement areacode={city.areacode} />
      )}
    </S.CitySection>
  );
};

export default CitySection;
