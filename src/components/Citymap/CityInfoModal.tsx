import { useEffect } from 'react';
import styled from 'styled-components';
import { CityAreaInfo } from '@/recoil/atom/CityAreaInfo';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const CityInfoModal = ({ closeModalIfClickOutside, closeModal }: any) => {
  const navigate = useNavigate();
  const [areaInfo, setAreaInfo] = useRecoilState(CityAreaInfo);

  return (
    <StyleWrap
      onClick={(event) => {
        closeModalIfClickOutside(event);
      }}
    >
      <ModalBox>
        <img
          style={{
            width: '23rem',
            height: 'inherit',
            borderRadius: '8px',
          }}
          src={require(`@/assets/CityImage/${areaInfo.jpgindex}.jpg`).default}
        ></img>
        <StyleContent>
          <StyleCityTitleEng>{areaInfo.engarea}</StyleCityTitleEng>
          <StyleCityTitleKor>대한민국 {areaInfo.korarea}</StyleCityTitleKor>
          <StyleCityDescript>{areaInfo.description}</StyleCityDescript>
          <StyleCityHashtag>{areaInfo.hashtag}</StyleCityHashtag>
          <StyleCityWrap>
            <StyleCityTourWrap>
              <TourName>관광명소</TourName>
              <TourContent>{areaInfo.tourcount}</TourContent>
            </StyleCityTourWrap>
            <StyleCityTourWrap>
              <TourName>여행시기</TourName>
              <TourContent>{areaInfo.tourdate}</TourContent>
            </StyleCityTourWrap>
            <StyleCityTourWrap>
              <TourName>지역특산물</TourName>
              <TourContent>{areaInfo.spec}</TourContent>
            </StyleCityTourWrap>
          </StyleCityWrap>
          {/* 버튼 */}
          <StyleButtomWrap>
            {/* navigate 지정 */}
            <StyleButton
              onClick={() => {
                navigate(`/citydetail/${areaInfo.areacode}`);
              }}
            >
              도시 상세보기
            </StyleButton>
            <StyleButton
              onClick={() => {
                navigate('/planner/:userId/:planUniqueId');
              }}
            >
              일정 만들기
            </StyleButton>
          </StyleButtomWrap>
        </StyleContent>
      </ModalBox>
    </StyleWrap>
  );
};

const StyleWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.082);
  backdrop-filter: blur(2px);
  z-index: 99999;
`;

const ModalBox = styled.div`
  position: fixed;
  width: 900px;
  height: 450px;
  top: 50%;
  left: 50%;
  background: #fff;
  border-radius: 8px;
  transform: translate(-50%, -50%);

  display: flex;
  gap: 30px;
  align-items: center;
`;

const StyleContent = styled.div`
  border-radius: 8px;
  width: 100%;
  height: inherit;
  padding: 20px 20px;
`;

const StyleCityTitleEng = styled.div`
  margin-top: 1rem;
  font-weight: 700;
  font-size: 25px;
`;

const StyleCityTitleKor = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-top: 1rem;
`;

const StyleCityDescript = styled.div`
  border-radius: 5px;
  color: #9d9d9d;
  margin-top: 2rem;
  font-size: 14px;
  line-height: 1.3;
  height: 100px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    border-radius: 6px;
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 6px;
  }
`;

const StyleCityHashtag = styled.div`
  margin-top: 2rem;
  font-size: 14px;
  font-weight: 700;
`;

const StyleCityWrap = styled.div`
  display: flex;
  margin-top: 25px;
  gap: 60px;
  justify-content: center;
`;

const TourName = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
const StyleCityTourWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
`;
const TourContent = styled.div`
  margin-top: 4px;
  font-size: 15px;
`;

//버튼
const StyleButtomWrap = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const StyleButton = styled.button`
  width: 160px;
  padding: 20px 20px;
  border-radius: 5px;
`;

export default CityInfoModal;
