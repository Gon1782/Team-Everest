import { useNavigate } from 'react-router-dom';
import useDefault from '@/hooks/useDefault';
import { Item } from '@/types/DetailType';
import * as S from './style/CommonStyled';
import { useEffect, useState } from 'react';
import { getReview } from '@/common/api/reviewApi';

interface Props {
  item?: Item;
}

const InfoBox = ({ item }: Props) => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const defaults = useDefault();
  const { defaultImage } = defaults();
  const img = !!item?.firstimage ? item.firstimage : defaultImage;

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
    <S.InfoBox onClick={() => navigate(`/detail/${item?.contentid}`)}>
      <S.Image src={img} />
      <S.Info>
        <S.Place>
          <span style={{ color: '#0034B9' }}>Location</span>
          <span style={{ color: '#5A5A5A', wordBreak: 'keep-all' }}>
            {item?.addr1}
          </span>
        </S.Place>
        <span>{item?.title}</span>
        <S.Rating>⭐{rating.toFixed(2)}</S.Rating>
      </S.Info>
    </S.InfoBox>
  );
};

export default InfoBox;
