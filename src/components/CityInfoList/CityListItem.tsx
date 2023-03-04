import React from 'react';
import { getReview } from '@/common/api/reviewApi';
import { useEffect, useState } from 'react';
import * as S from './CityInfoListStyled';

interface Props {
  item: any;
  img: string;
}

const CityListItem = ({ item, img }: Props) => {
  const [rating, setRating] = useState(0);
  // const [tags, setTags] = useState();
  // console.log(item.contentid);
  // const id = !!item ? item.contentid : '';

  const getRating = async () => {
    const id = !!item ? item.contentid : '';
    const data = await getReview(id);
    const totalRating = !!data ? data?.totalRating : 0;
    const ratingCount = !!data ? data?.ratingCount : 0;
    const rating = ratingCount === 0 ? 0 : totalRating / ratingCount;
    setRating(rating);
  };

  // const getTags = async () => {
  //   const id = !!item ? item.contentid : '';
  //   const data = await getReview(id);
  //   // console.log('data[0]', data);
  //   let itemTag: any = '';
  //   if (!!data) {
  //     Object.keys(data).forEach((v) => (itemTag = v));
  //   }
  //   // const itemTag = !!data ? data?.areacode : '';
  //   setTags(itemTag);
  // };

  // console.log(tags);

  useEffect(() => {
    getRating();
    // getTags();
  }, [item]);

  return (
    <>
      <S.Image src={img}></S.Image>
      <S.ContentInfoWrap>
        <S.TourName>{item.title}</S.TourName>
        <S.TourAddr>{item.addr1}</S.TourAddr>
        <S.TourTags>태그 영역</S.TourTags>
        <S.TourRating>⭐{rating.toFixed(2)}</S.TourRating>
      </S.ContentInfoWrap>
    </>
  );
};

export default CityListItem;
