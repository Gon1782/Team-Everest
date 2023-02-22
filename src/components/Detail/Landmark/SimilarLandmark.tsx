import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getSimilar } from '@/common/api/detailApi';
import { category as category3 } from '@/common/utils/cat3';
import { DetailResponse, Item } from '@/types/DetailType';
import Landmark from './Landmark';
import * as S from './style/LandmarkStyled';

interface Props {
  detailList: Item;
  id?: string;
}

const SimilarLandmark = ({ id, detailList }: Props) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [pageNo, setPageNo] = useState(0);

  // TiL
  useEffect(() => {
    const category = detailList.cat3;
    const pageNo = Math.floor(Math.random() * (category3[category] + 1));

    setCategory(category);
    setPageNo(pageNo);
  }, [detailList]);

  const { isLoading, isError, data, error } = useQuery<DetailResponse, Error>(
    'similar',
    () => getSimilar(pageNo, category),
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
    (list) => list.contentid !== id,
  );

  return (
    <S.LandmarkContainer
      style={{ display: !!Landmarks?.length ? 'grid' : 'none' }}
    >
      {Landmarks?.map((landmark) => {
        return <Landmark key={landmark.contentid} landmark={landmark} />;
      })}
      <S.SeeMore onClick={() => navigate('/myPlan')}>일정 만들기</S.SeeMore>
    </S.LandmarkContainer>
  );
};

export default SimilarLandmark;
