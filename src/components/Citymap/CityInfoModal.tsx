import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCities } from '@/common/api/cityApi';
import { City } from '@/types/CityType';
import * as S from './style/CitymapStyle';

interface Props {
  areaCode: string;
  sigunguCode: string;
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const CityInfoModal = ({
  areaCode,
  sigunguCode,
  closeModalIfClickOutside,
}: Props) => {
  const navigate = useNavigate();
  const [areaInfo, setAreaInfo] = useState<City>();

  const getCity = async () => {
    await getCities(areaCode, sigunguCode)
      .then((res) => setAreaInfo(res))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getCity();
  }, []);

  return (
    <S.StyleWrap
      onClick={(event) => {
        closeModalIfClickOutside(event);
      }}
    >
      <S.ModalBox>
        <S.ModalImg src={areaInfo?.image} alt="city" />
        <S.StyleContent>
          <S.StyleCityTitleEng>{areaInfo?.engarea}</S.StyleCityTitleEng>
          <S.StyleCityTitleKor>대한민국 {areaInfo?.name}</S.StyleCityTitleKor>
          <S.StyleCityDescript>{areaInfo?.description}</S.StyleCityDescript>
          <S.StyleCityHashtag>{areaInfo?.hashtag}</S.StyleCityHashtag>
          <S.StyleCityWrap>
            <S.StyleCityTourWrap>
              <S.TourName>관광명소</S.TourName>
              <S.TourContent>{areaInfo?.tourcount}</S.TourContent>
            </S.StyleCityTourWrap>
            <S.StyleCityTourWrap>
              <S.TourName>여행시기</S.TourName>
              <S.TourContent>{areaInfo?.tourdate}</S.TourContent>
            </S.StyleCityTourWrap>
            <S.StyleCityTourWrap>
              <S.TourName>지역특산물</S.TourName>
              <S.TourContent>{areaInfo?.spec}</S.TourContent>
            </S.StyleCityTourWrap>
          </S.StyleCityWrap>
          <S.StyleButtomWrap>
            {/* navigate 지정 */}
            <S.StyleButton
              onClick={() => {
                !!areaInfo?.sigunguCode
                  ? navigate(
                      `/citydetail/${areaInfo?.areaCode}/${areaInfo?.sigunguCode}`,
                    )
                  : navigate(`/citydetail/${areaInfo?.areaCode}`);
              }}
            >
              도시 상세보기
            </S.StyleButton>
            {/* <S.StyleButton
              onClick={() => {
                navigate('/planner/my/write');
              }}
            >
              일정 만들기
            </S.StyleButton> */}
          </S.StyleButtomWrap>
        </S.StyleContent>
      </S.ModalBox>
    </S.StyleWrap>
  );
};

export default CityInfoModal;
