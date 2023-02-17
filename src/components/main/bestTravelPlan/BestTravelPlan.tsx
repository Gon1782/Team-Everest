import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBookmark } from 'react-icons/fa';

const BestTravelPlan = () => {
  return (
    <BestTravelPlanContainer>
      <BestTravelPlanCard>
        <TravelPlaceMainImgWrapper>
          <TravelPlaceMainImg
            src={require('@/assets/banner_01.jpg').default}
            alt=""
          />
        </TravelPlaceMainImgWrapper>
        <Wrapper>
          <TravelPlaceReviewerImgWrapper>
            <TravelPlaceReviewerImg
              src={require('@/assets/MyPage/defaultProfile.jpg').default}
              alt=""
            />
          </TravelPlaceReviewerImgWrapper>
        </Wrapper>
        <TravelPlanInfo>
          <TravelPlaceName>일정 이름</TravelPlaceName>
          <BookMarkCount>
            <BookMarkIcon />
            <BookMarkCountNumber>00</BookMarkCountNumber>
          </BookMarkCount>
        </TravelPlanInfo>
      </BestTravelPlanCard>
    </BestTravelPlanContainer>
  );
};

export default BestTravelPlan;

// 베스트 여행 일정

const BestTravelPlanContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #d68989;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 70px 50px;
`;

const BestTravelPlanCard = styled.div`
  background-color: #dadada;
  border-radius: 20px;
  width: 250px;
  height: 300px;
  margin: 0 10px 20px 10px;
  position: relative;
  overflow: hidden;
`;

const TravelPlaceMainImgWrapper = styled.div`
  background-color: #b6b6b6;
  height: 60%;
`;

const TravelPlaceMainImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: absolute;
  /* bottom: 35%; */
  top: 52%;
  left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TravelPlaceReviewerImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: #383838;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
`;

const TravelPlaceReviewerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TravelPlaceName = styled.h4`
  font-size: 1.2rem;
`;

// const TravelPlaceSubImgWrapper = styled.div`
//   background-color: #9b6969;
//   height: 60%;
// `;

// const TravelPlaceSubImg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

const TravelPlanInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 10px;
  padding: 0px 20px;
  margin-bottom: 15px;
`;

const BookMarkCount = styled.div`
  display: flex;
`;

const BookMarkCountNumber = styled.p`
  font-size: 1.1rem;
`;

const BookMarkIcon = styled(FaBookmark)`
  margin-right: 10px;
`;
