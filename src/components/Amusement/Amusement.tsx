import { useQuery } from 'react-query';
import { getAmusement } from '@/common/api/tourApi';
import { DetailResponse } from '@/types/DetailType';
import InfoBox from '../common/InfoBox';
import * as S from './style/AmusementStyled';

interface Props {
  areacode: string;
}

const Amusement = ({ areacode }: Props) => {
  const { isLoading, isError, data, error } = useQuery<DetailResponse, Error>(
    'amusement',
    () => getAmusement(areacode),
  );

  if (isLoading)
    return (
      <S.AmusementInfoContainer>
        <InfoBox />
        <InfoBox />
        <InfoBox />
        <InfoBox />
        <InfoBox />
      </S.AmusementInfoContainer>
    );
  if (isError) return <div>에러: {error.message}</div>;

  const detailList = data?.response.body.items.item;

  return (
    <S.AmusementInfoContainer>
      {detailList?.map((x) => {
        return <InfoBox item={x} key={x.contentid} />;
      })}
    </S.AmusementInfoContainer>
  );
};

export default Amusement;
