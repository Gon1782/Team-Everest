import { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getReview } from '@/common/api/reviewApi';
import { categoryKor } from '@/common/utils/cat3';
import { Item } from '@/types/DetailType';
import * as S from './style/CityInfoListStyled';
interface Props {
  item: Item;
  img: string;
}

const CityListItem = ({ item, img }: Props) => {
  return (
    <>
      <S.Image src={img} alt="landmark"></S.Image>
      <S.ContentInfoWrap>
        <S.TopSection>
          <S.TourCat>{categoryKor[item.cat3] || '-'}</S.TourCat>
        </S.TopSection>
        <S.TourName>{item.title}</S.TourName>
        <S.TourAddr>{item.addr1}</S.TourAddr>
      </S.ContentInfoWrap>
    </>
  );
};

export default CityListItem;
