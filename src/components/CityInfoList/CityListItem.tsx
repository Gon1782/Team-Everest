import useDefault from '@/hooks/useDefault';
import { categoryKor } from '@/common/utils/cat3';
import { Item } from '@/types/DetailType';
import * as S from './style/CityInfoListStyled';
interface Props {
  item: Item;
}

const CityListItem = ({ item }: Props) => {
  // 이미지
  const defaults = useDefault();
  const { defaultImage } = defaults();

  const img = !!item?.firstimage
    ? `https://${item.firstimage.slice(7)}`
    : defaultImage;
  return (
    <>
      <S.Image src={img} alt="landmark"></S.Image>
      <S.ContentInfoWrap>
        <S.TopSection>
          <S.TourCat>{categoryKor[item.cat3] || '-'}</S.TourCat>
        </S.TopSection>
        <S.TourName>{item.title}</S.TourName>
        <S.TourAddr>{item.addr1}</S.TourAddr>
      </S.ContentInfoWrap>
    </>
  );
};

export default CityListItem;
