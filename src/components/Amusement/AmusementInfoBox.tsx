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

  const addr = !!item ? item.addr1.split(' ') : [];

  return (
    <S.AmusementInfoBox onClick={() => navigate(`/detail/${item?.contentid}`)}>
      <S.AmusementImg src={img} alt="amusement" />
      <S.AmusementInfos>
        <S.AmusementTitle>{item?.title}</S.AmusementTitle>
        <S.AmuseCategory>
          {!!item ? categoryKor[item.cat3] : '-'}
        </S.AmuseCategory>
        <S.AmusePlace>
          <S.AmuseLocation>Location</S.AmuseLocation>
          <S.AmuseAddr>{`${addr[0]} ${addr[1]} ${addr[2]}`}</S.AmuseAddr>
        </S.AmusePlace>
      </S.AmusementInfos>
    </S.AmusementInfoBox>
  );
};

export default AmusementInfoBox;
