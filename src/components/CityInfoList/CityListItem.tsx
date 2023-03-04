import React from 'react';
import { getReview } from '@/common/api/reviewApi';
import { useEffect, useState } from 'react';
import * as S from './CityInfoListStyled';
import { categoryKor } from '@/common/utils/cat3';
interface Props {
  item: any;
  img: string;
}

const CityListItem = ({ item, img }: Props) => {
  const [rating, setRating] = useState(0);

  // 별점 조회
  const getRating = async () => {
    const id = !!item ? item.contentid : '';
    const data = await getReview(id);
    const totalRating = !!data ? data?.totalRating : 0;
    const ratingCount = !!data ? data?.ratingCount : 0;
    const rating = ratingCount === 0 ? 0 : totalRating / ratingCount;
    setRating(rating);
  };

  useEffect(() => {
    getRating();
  }, [item]);

  return (
    <>
      <S.Image src={img}></S.Image>
      <S.ContentInfoWrap>
        <S.TopSection>
          <S.TourCat>{categoryKor[item.cat3] || '-'}</S.TourCat>
          <S.TourRating>⭐{rating.toFixed(2)}</S.TourRating>
        </S.TopSection>
        <S.TourName>{item.title}</S.TourName>
        <S.TourAddr>{item.addr1}</S.TourAddr>
      </S.ContentInfoWrap>
    </>
  );
};

export default CityListItem;
