import { useNavigate } from 'react-router-dom';
import useDefault from '@/hooks/useDefault';
import { Item } from '@/types/DetailType';
import { useEffect, useState } from 'react';
import { getReview } from '@/common/api/reviewApi';
import { categoryKor } from '@/common/utils/cat3';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import * as S from './style/AmusementStyled';

interface Props {
  item?: Item;
}

const AmusementInfoBox = ({ item }: Props) => {
  const navigate = useNavigate();
  const defaults = useDefault();
  const { defaultImage } = defaults();
  const img = !!item?.firstimage ? item.firstimage : defaultImage;

  const [ratingScore, setRatingScore] = useState(0);
  const getRating = async () => {
    const id = !!item ? item.contentid : '';
    const data = await getReview(id);
    const totalRating = !!data ? data?.totalRating : 0;
    const ratingCount = !!data ? data?.ratingCount : 0;
    const ratingScore = ratingCount === 0 ? 0 : totalRating / ratingCount;
    setRatingScore(Number(ratingScore.toFixed(2)));
  };

  useEffect(() => {
    getRating();
  }, [item]);

  const rating = [false, false, false, false, false].map((_, i) =>
    i < Math.floor(ratingScore) ? true : false,
  );

  const addr = !!item ? item.addr1.split(' ') : [];

  return (
    <S.AmusementInfoBox onClick={() => navigate(`/detail/${item?.contentid}`)}>
      <S.AmusementImg src={img} />
      <S.AmusementInfos>
        <S.AmusementTitle>{item?.title}</S.AmusementTitle>
        <S.AmuseCategory>
          {!!item ? categoryKor[item.cat3] : '-'}
        </S.AmuseCategory>
        <S.AmuseRating>
          {rating.map((x, i) => {
            if (x) {
              return <FaStar key={i} />;
            } else {
              if (rating[i - 1] && ratingScore !== Math.floor(ratingScore))
                return <FaStarHalfAlt key={i} />;
              return <FaRegStar key={i} />;
            }
          })}
        </S.AmuseRating>
        <S.AmusePlace>
          <S.AmuseLocation>Location</S.AmuseLocation>
          <S.AmuseAddr>{`${addr[0]} ${addr[1]} ${addr[2]}`}</S.AmuseAddr>
        </S.AmusePlace>
      </S.AmusementInfos>
    </S.AmusementInfoBox>
  );
};

export default AmusementInfoBox;
