import { useRecoilValue } from 'recoil';
import { DetailList } from '@/recoil/atom/Detail';
import { Item } from '@/types/DetailType';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import * as S from '@/pages/Detail/style/DetailStyled';
import { useState } from 'react';
import DetailMap from './DetailMap';
interface Props {
  item: Item | undefined;
  intro: Item | undefined;
}

const DetailInfo = ({ item, intro }: Props) => {
  const list = useRecoilValue(DetailList);
  const [bookMark, setBookMark] = useState(false);

  return (
    <S.DetailSection>
      <S.InfoBox>
        <div></div>
        <S.DetailTitle>{item?.title}</S.DetailTitle>
        <S.DetailScore>
          <span>
            ⭐
            {list.ratingCount > 0
              ? (list.totalRating / list.ratingCount).toFixed(2)
              : 0}
          </span>
          <FaRegBookmark
            onClick={() => setBookMark(true)}
            style={{ cursor: 'pointer', display: bookMark ? 'none' : 'flex' }}
          />
          <FaBookmark
            onClick={() => setBookMark(false)}
            style={{ cursor: 'pointer', display: bookMark ? 'flex' : 'none' }}
            color="red"
          />
        </S.DetailScore>
      </S.InfoBox>
      <S.LandmarkImg
        src={
          !!item?.firstimage
            ? item.firstimage
            : 'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
        }
      />
      <div
        style={{ width: 1024, lineHeight: '1.5rem', textAlign: 'center' }}
        dangerouslySetInnerHTML={{
          __html: !!item?.overview ? item.overview : '',
        }}
      ></div>
      <DetailMap x={item.mapx} y={item.mapy} />
      <S.LocationInfo>
        <S.SmallTitle>
          문의 및 안내
          <S.LandMarkInfo>{intro?.infocenter}</S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle>
          주소 <S.LandMarkInfo>{item?.addr1}</S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle>
          홈페이지
          <S.LandMarkInfo
            dangerouslySetInnerHTML={{
              __html: !!item?.homepage ? item.homepage : '',
            }}
          ></S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle>
          휴무일
          <S.LandMarkInfo>{intro?.restdate}</S.LandMarkInfo>
        </S.SmallTitle>
      </S.LocationInfo>
    </S.DetailSection>
  );
};

export default DetailInfo;
