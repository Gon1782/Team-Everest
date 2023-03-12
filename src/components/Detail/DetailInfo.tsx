import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FaBookmark, FaRegBookmark, FaStar } from 'react-icons/fa';
import useDefault from '@/hooks/useDefault';
import { DetailList } from '@/recoil/atom/Detail';
import { Item } from '@/types/DetailType';
import DetailMap from './DetailMap';
import { addWishList, popWishList } from '../MyPlan/MyPlannerHandler';
import * as S from '@/pages/Detail/style/DetailStyled';

interface Props {
  item?: Item;
  intro?: Item;
  wishList?: Item[];
}

const DetailInfo = ({ item, intro, wishList }: Props) => {
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
  const img = !!item?.firstimage
    ? `https://${item.firstimage.slice(7)}`
    : defaultImage;

  // 관광지소개
  const overview = {
    __html: !!item?.overview ? item.overview : '',
  };

  // 관광지 홈페이지
  const homepage = {
    __html: !!item?.homepage ? item.homepage : '',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bookMark, setBookMark] = useState(false);

  const handlerWishList = () => {
    if (
      window.confirm(`북마크에 ${!bookMark ? '추가' : '취소'} 하시겠습니까?`)
    ) {
      if (!bookMark) {
        // 추가()
        addWishList(wishList, item, uid);
      } else {
        //삭제
        popWishList(wishList, item, uid);
      }
      setBookMark(!bookMark);
    } else {
      alert('취소하셨습니다');
    }
  };

  useEffect(() => {
    const isGet = wishList?.filter(
      (wishItem: Item) => wishItem.contentid === item?.contentid,
    ).length;

    !!isGet ? setBookMark(true) : setBookMark(false);
  }, [wishList]);

  return (
    <S.DetailSection>
      <S.InfoBox>
        <S.DetailScore>
          <S.DetailRatingBox>
            <FaStar color="#2871A3" size={22} />
            {rating}
          </S.DetailRatingBox>
          <div style={{ display: !!uid ? 'flex' : 'none', cursor: 'pointer' }}>
            <FaRegBookmark
              onClick={() => handlerWishList()}
              style={{ display: bookMark ? 'none' : 'flex' }}
            />
            <FaBookmark
              onClick={() => handlerWishList()}
              style={{ display: bookMark ? 'flex' : 'none' }}
              color="#EF4B27"
              size={18}
            />
          </div>
        </S.DetailScore>
        <S.DetailTitle>{item?.title ? item.title : '관광지'}</S.DetailTitle>
      </S.InfoBox>
      <S.LandmarkImg src={img} alt="landmark" />
      <S.DetailOverview dangerouslySetInnerHTML={overview}></S.DetailOverview>
      <DetailMap x={item?.mapx} y={item?.mapy} />
      <S.LocationInfo>
        <S.SmallTitle style={{ display: !!homepage ? 'flex' : 'none' }}>
          홈페이지
          <S.LandMarkInfo dangerouslySetInnerHTML={homepage}></S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle style={{ display: !!item?.addr1 ? 'flex' : 'none' }}>
          주소
          <S.LandMarkInfo>{item?.addr1}</S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle
          style={{ display: !!intro?.infocenter ? 'flex' : 'none' }}
        >
          문의 및 안내
          <S.LandMarkInfo>{intro?.infocenter}</S.LandMarkInfo>
        </S.SmallTitle>
        <S.SmallTitle style={{ display: !!intro?.restdate ? 'flex' : 'none' }}>
          휴무일
          <S.LandMarkInfo>{intro?.restdate}</S.LandMarkInfo>
        </S.SmallTitle>
      </S.LocationInfo>
    </S.DetailSection>
  );
};

export default DetailInfo;
