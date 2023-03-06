import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBookmark } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getAllPlanner } from '@/common/api/plannerApi';
import { CloneEventMap } from '@/components/MyPlan/EventMap';

const BestTravelPlan = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = useQuery('getAllPlanner', getAllPlanner);

  if (!!isLoading) return <>잠시만뇽</>;
  if (!!isError) return <>?? 에러누</>;

  const moveToMyPlan = (item: any, index: number) => {
    navigate(`/planner/${item.uid}/${item.planUniqueId}`);
  };

  return (
    <BestTravelPlanContainer>
      <BestTravelPlanTitle>
        <h1>BEST 여행 일정</h1>
      </BestTravelPlanTitle>
      <>
        {!!data && !!data['items'].length ? (
          <>
            {data['items']
              .map((item: any, index: number) => {
                if (item.isDelete === false && item.isShow === true) {
                  return (
                    <BestTravelPlanCard
                      onClick={() => moveToMyPlan(item, index)}
                      key={index}
                    >
                      <TravelPlaceMainImgWrapper>
                        {/* <TravelPlaceMainImg src={item.image} alt="" /> */}
                        <CloneEventMap
                          plan={data['items'][index]}
                          startDate={
                            data['items'][index]['startDate']['yyyymmdd']
                          }
                          height={225}
                        ></CloneEventMap>
                      </TravelPlaceMainImgWrapper>

                      <Wrapper>
                        <TravelPlaceReviewerImgWrapper>
                          <TravelPlaceReviewerImg
                            src={
                              require('@/assets/MyPage/defaultProfile.jpg')
                                .default
                            }
                            alt=""
                          />
                        </TravelPlaceReviewerImgWrapper>
                      </Wrapper>
                      <TravelPlanInfo>
                        <TravelPlaceName>{item.name}</TravelPlaceName>
                        <BookMarkCount>
                          <BookMarkIcon />
                          <BookMarkCountNumber>
                            {item.bookmarkCount}
                          </BookMarkCountNumber>
                        </BookMarkCount>
                      </TravelPlanInfo>
                    </BestTravelPlanCard>
                  );
                }
              })
              .slice(0, 15)}
          </>
        ) : (
          <>베스트 일정이 아직 없어요!</>
        )}
      </>
    </BestTravelPlanContainer>
  );
};

export default BestTravelPlan;

// 베스트 여행 일정

const BestTravelPlanContainer = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 70px 50px;
  margin: 30px auto;
`;

const BestTravelPlanTitle = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
`;

const BestTravelPlanCard = styled.div`
  background-color: #dadada;
  border-radius: 20px;
  /* width: 250px; */
  width: 20%;
  height: 300px;
  margin: 0 10px 40px 10px;
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
  color: #eb455f;
`;
