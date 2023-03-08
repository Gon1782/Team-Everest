import { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getReview } from '@/common/api/reviewApi';
import { categoryKor } from '@/common/utils/cat3';
import useDefault from '@/hooks/useDefault';
import { Item } from '@/types/DetailType';
import * as S from './style/MichelinStyled';

interface Props {
  item?: Item;
}

const MichelinInfoBox = ({ item }: Props) => {
  const [ratingScore, setRatingScore] = useState(0);
  const navigate = useNavigate();
  const defaults = useDefault();
  const { defaultImage } = defaults();
  const img = !!item?.firstimage
    ? `https://${item.firstimage.slice(7)}`
    : defaultImage;

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

  const addr = !!item ? item.addr1.split(' ') : [];

  const rating = [false, false, false, false, false].map((_, i) =>
    i < Math.floor(ratingScore) ? true : false,
  );

  return (
    <S.MichelinInfoBox onClick={() => navigate(`/detail/${item?.contentid}`)}>
      <S.MichelinImage src={img} alt="michelin" />
      <S.MichelinInfo>
        <S.MichelinInfos>
          <S.MichelinPlace>
            <S.MichelinLocation>Location</S.MichelinLocation>
            <S.MichelinAddr>{`${addr[0]} ${addr[1]}`}</S.MichelinAddr>
          </S.MichelinPlace>
          <S.MichelinInfoTitle>{item?.title}</S.MichelinInfoTitle>
          <S.MichelinCategory>
            {!!item ? categoryKor[item.cat3] : '-'}
          </S.MichelinCategory>
          <S.MichelinRatingDiv>
            {rating.map((x, i) => {
              if (x) {
                return <FaStar color="#2871A3" size={24} key={i} />;
              } else {
                if (rating[i - 1] && ratingScore !== Math.floor(ratingScore))
                  return <FaStarHalfAlt color="#2871A3" size={20} key={i} />;
                return <FaRegStar color="#2871A3" size={20} key={i} />;
              }
            })}
          </S.MichelinRatingDiv>
        </S.MichelinInfos>
      </S.MichelinInfo>
    </S.MichelinInfoBox>
  );
};

export default MichelinInfoBox;
