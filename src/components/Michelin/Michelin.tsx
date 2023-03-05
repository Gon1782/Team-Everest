import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getMichelin } from '@/common/api/tourApi';
import { City } from '@/types/CityType';
import { DetailResponse } from '@/types/DetailType';
import MichelinInfoBox from './MichelinInfoBox';
import * as S from './style/MichelinStyled';

interface Props {
  city: City;
}

const Michelin = ({ city }: Props) => {
  const { isLoading, isError, data, error, refetch } = useQuery<
    DetailResponse,
    Error
  >('michelin', () => getMichelin(city?.areaCode, city?.sigunguCode));

  useEffect(() => {
    refetch();
  }, [city]);

  if (isLoading)
    return (
      <S.MichelinSection>
        <S.MichelinTitle>여행에서 맛집이 빠질수 없죠 !</S.MichelinTitle>
        <S.MichelinInfoContainer>
          <MichelinInfoBox />
          <MichelinInfoBox />
          <MichelinInfoBox />
          <MichelinInfoBox />
        </S.MichelinInfoContainer>
      </S.MichelinSection>
    );
  if (isError) return <div>에러: {error.message}</div>;

  const detailList = data?.response.body.items.item;

  return (
    <S.MichelinSection>
      <S.MichelinTitle>여행에서 맛집이 빠질수 없죠 !</S.MichelinTitle>
      <S.MichelinInfoContainer>
        {detailList?.map((x) => {
          return <MichelinInfoBox item={x} key={x.contentid} />;
        })}
      </S.MichelinInfoContainer>
    </S.MichelinSection>
  );
};

export default Michelin;
