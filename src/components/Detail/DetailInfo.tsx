import * as S from '@/pages/Detail/DetailStyled';
import { DetailList } from '@/recoil/Detail';
import { Item } from '@/types/DetailType';
import { useRecoilValue } from 'recoil';

interface Props {
  item: Item | undefined;
}

const DetailInfo = ({ item }: Props) => {
  const list = useRecoilValue(DetailList);
  return (
    <S.DetailSection>
      <S.ImageSkeleton src={item?.firstimage} />
      <S.InfoBox>
        <S.DetailTitle>{item?.title}</S.DetailTitle>
        <S.DetailScore>
          {list.ratingCount > 0
            ? (list.totalRating / list.ratingCount).toFixed(2)
            : 0}
          /{list.ratingCount ? list.ratingCount : 0}개
        </S.DetailScore>
      </S.InfoBox>
      <S.DetailInfoBox>
        <div>상세정보</div>
        <S.LocationInfo>
          <S.SmallTitle>주소</S.SmallTitle>
          <div>{item?.addr1}</div>
          <S.SmallTitle>홈페이지</S.SmallTitle>
          <div dangerouslySetInnerHTML={{ __html: item?.homepage ?? '' }}></div>
          <S.SmallTitle>간단소개</S.SmallTitle>
          <div dangerouslySetInnerHTML={{ __html: item?.overview ?? '' }}></div>
        </S.LocationInfo>
      </S.DetailInfoBox>
    </S.DetailSection>
  );
};

export default DetailInfo;
