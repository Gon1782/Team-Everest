import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import useDefault from '@/hooks/useDefault';
import { DetailList } from '@/recoil/atom/Detail';
import { Item } from '@/types/DetailType';
import DetailMap from './DetailMap';
import * as S from '@/pages/Detail/style/DetailStyled';
interface Props {
  item: Item;
  intro: Item;
}

const DetailInfo = ({ item, intro }: Props) => {
  // 북마크 여부만 확인
  const [bookMark, setBookMark] = useState(false);

  // 로그인 여부 확인
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 별점
  const list = useRecoilValue(DetailList);
  const rating = !!list.ratingCount
    ? (list.totalRating / list.ratingCount).toFixed(2)
    : 0;

  // 이미지
  const defaults = useDefault();
  const { defaultImage } = defaults();
  const img = !!item?.firstimage ? item.firstimage : defaultImage;

  // 관광지소개
  const overview = {
    __html: !!item?.overview ? item.overview : '',
  };

  // 관광지 홈페이지
  const homepage = {
    __html: !!item?.homepage ? item.homepage : '',
  };

  return (
    <S.DetailSection>
      <S.InfoBox>
        <div></div>
        <S.DetailTitle>{item?.title}</S.DetailTitle>
        <S.DetailScore>
          <span>⭐{rating}</span>
          <div style={{ display: !!uid ? 'flex' : 'none' }}>
            <FaRegBookmark
              onClick={() => setBookMark(true)}
              style={{ display: bookMark ? 'none' : 'flex' }}
            />
            <FaBookmark
              onClick={() => setBookMark(false)}
              style={{ display: bookMark ? 'flex' : 'none' }}
              color="red"
            />
          </div>
        </S.DetailScore>
      </S.InfoBox>
      <S.LandmarkImg src={img} />
      <S.DetailOverview dangerouslySetInnerHTML={overview}></S.DetailOverview>
      <DetailMap x={item.mapx} y={item.mapy} />
      <S.LocationInfo>
        <S.SmallTitle style={{ display: !!homepage ? 'flex' : 'none' }}>
          홈페이지
          <S.LandMarkInfo dangerouslySetInnerHTML={homepage}></S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle style={{ display: !!item.addr1 ? 'flex' : 'none' }}>
          주소 <S.LandMarkInfo>{item.addr1}</S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle
          style={{ display: !!intro?.infocenter ? 'flex' : 'none' }}
        >
          문의 및 안내
          <S.LandMarkInfo>{intro.infocenter}</S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle style={{ display: !!intro?.restdate ? 'flex' : 'none' }}>
          휴무일
          <S.LandMarkInfo>{intro.restdate}</S.LandMarkInfo>
        </S.SmallTitle>
      </S.LocationInfo>
    </S.DetailSection>
  );
};

export default DetailInfo;
