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
  // const [ratingScore, setRatingScore] = useState(0);

  // 별점 조회
  // const getRating = async () => {
  //   const id = !!item ? item.contentid : '';
  //   const data = await getReview(id);
  //   const totalRating = !!data ? data?.totalRating : 0;
  //   const ratingCount = !!data ? data?.ratingCount : 0;
  //   const ratingScore = ratingCount === 0 ? 0 : totalRating / ratingCount;
  //   setRatingScore(Number(ratingScore.toFixed(2)));
  // };

  // useEffect(() => {
  //   getRating();
  // }, [item]);

  // const rating = [false, false, false, false, false].map((_, i) =>
  //   i < Math.floor(ratingScore) ? true : false,
  // );

  return (
    <>
      <S.Image src={img}></S.Image>
      <S.ContentInfoWrap>
        <S.TopSection>
          <S.TourCat>{categoryKor[item.cat3] || '-'}</S.TourCat>
        </S.TopSection>
        <S.TourName>{item.title}</S.TourName>
        <S.TourAddr>{item.addr1}</S.TourAddr>
        {/* {rating.map((x, i) => {
          if (x) {
            return <FaStar color="#0039CB" size={24} key={i} />;
          } else {
            if (rating[i - 1] && ratingScore !== Math.floor(ratingScore))
              return <FaStarHalfAlt color="#0039CB" size={24} key={i} />;
            return <FaRegStar color="#0039CB" size={24} key={i} />;
          }
        })} */}
      </S.ContentInfoWrap>
    </>
  );
};

export default CityListItem;
