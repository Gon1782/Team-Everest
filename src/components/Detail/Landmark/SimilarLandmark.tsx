import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getSimilar } from '@/common/api/tourApi';
import { category as category3 } from '@/common/utils/cat3';
import { DetailResponse, Item } from '@/types/DetailType';
import Landmark from './Landmark';
import * as S from './style/LandmarkStyled';
import Error from '@/components/common/Error';

interface Props {
  detailList: Item;
  id?: string;
  wishList: Item[];
}

const SimilarLandmark = ({ id, detailList, wishList }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState(detailList.cat3);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    const category = detailList.cat3;
    const pageNo = Math.floor(Math.random() * (category3[category] + 1));

    setCategory(category);
    setPageNo(pageNo);
  }, [detailList]);

  const { isLoading, isError, data, error, refetch } = useQuery<
    DetailResponse,
    Error
  >('similar', () => getSimilar(pageNo, category));

  useEffect(() => {
    queryClient.removeQueries('similar');
    refetch();
  }, [category, pageNo]);

  if (isLoading)
    return (
      <S.LandmarkContainer>
        <S.LandmarkBox></S.LandmarkBox>
        <S.LandmarkBox></S.LandmarkBox>
        <S.LandmarkBox></S.LandmarkBox>
        <S.LandmarkBox></S.LandmarkBox>
        <S.SeeMore onClick={() => navigate('/planner/my/write')}>
          일정 만들기
        </S.SeeMore>
      </S.LandmarkContainer>
    );

  if (isError) return <div>에러: {error.message}</div>;

  if (!data?.response) return <Error />;

  const Landmarks = data?.response.body.items?.item.filter(
    (list) => list.contentid !== id,
  );

  return (
    <S.LandmarkContainer
      style={{ display: !!Landmarks?.length ? 'grid' : 'none' }}
    >
      {Landmarks?.map((landmark) => {
        return (
          <Landmark
            key={landmark.contentid}
            landmark={landmark}
            wishList={wishList}
          />
        );
      })}
      {/* <S.SeeMore onClick={() => navigate('/planner/my/write')}>
        일정 만들기
      </S.SeeMore> */}
    </S.LandmarkContainer>
  );
};

export default SimilarLandmark;
