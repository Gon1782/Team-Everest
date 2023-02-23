import { useQuery } from 'react-query';
import { getMichelin } from '@/common/api/tourApi';
import { DetailResponse } from '@/types/DetailType';
import InfoBox from '../common/InfoBox';
import * as S from './style/MichelinStyled';

interface Props {
  areacode: string;
}

const Michelin = ({ areacode }: Props) => {
  const { isLoading, isError, data, error } = useQuery<DetailResponse, Error>(
    'michelin',
    () => getMichelin(areacode),
  );

  if (isLoading)
    return (
      <S.MichelinInfoContainer>
        <InfoBox />
        <InfoBox />
        <InfoBox />
        <InfoBox />
        <InfoBox />
      </S.MichelinInfoContainer>
    );
  if (isError) return <div>에러: {error.message}</div>;

  const detailList = data?.response.body.items.item;

  return (
    <S.MichelinInfoContainer>
      {detailList?.map((x) => {
        return <InfoBox item={x} key={x.contentid} />;
      })}
    </S.MichelinInfoContainer>
  );
};

export default Michelin;
