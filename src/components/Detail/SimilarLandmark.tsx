import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getSimilar } from '@/common/api/detailApi';
import { DetailResponse } from '@/types/DetailType';
import Landmark from './Landmark';
import * as S from './style/LandmarkStyled';

interface Props {
  id?: string;
  pageNo: number;
  cat: string;
}

const SimilarLandmark = ({ id, pageNo, cat }: Props) => {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery<DetailResponse, Error>(
    'similar',
    () => getSimilar(pageNo, cat),
  );

  if (isLoading)
    return (
      <S.LandmarkContainer>
        <S.LandmarkBox></S.LandmarkBox>
        <S.LandmarkBox></S.LandmarkBox>
        <S.LandmarkBox></S.LandmarkBox>
        <S.LandmarkBox></S.LandmarkBox>
        <S.SeeMore onClick={() => navigate('/myPlan')}>일정 만들기</S.SeeMore>
      </S.LandmarkContainer>
    );

  if (isError) return <div>에러: {error.message}</div>;

  const Landmarks = data?.response.body.items.item.filter(
    (x) => x.contentid !== id,
  );

  return (
    <S.LandmarkContainer
      style={{ display: !!Landmarks?.length ? 'grid' : 'none' }}
    >
      {Landmarks?.map((x) => {
        return <Landmark key={x.contentid} item={x} />;
      })}
      <S.SeeMore onClick={() => navigate('/myPlan')}>일정 만들기</S.SeeMore>
    </S.LandmarkContainer>
  );
};

export default SimilarLandmark;
