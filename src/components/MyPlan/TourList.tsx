import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NewPlanRecoil, PlanType, MyWishList } from '@/recoil/atom/MyPlan';

import styled from 'styled-components';
import { PickScheduleType } from '@/recoil/atom/MyPlan';
import { Item } from '@/types/DetailType';
import { categoryKor } from '@/common/utils/cat3';
import { BsFlagFill } from 'react-icons/bs';
const TourList = ({
  list,
  isShowMyWish,
  setIsShowMyWish,
  pickSchedule,
}: {
  list: Item[];
  isShowMyWish: boolean;
  setIsShowMyWish: React.Dispatch<React.SetStateAction<boolean>>;
  pickSchedule: PickScheduleType;
}) => {
  const setNewPlan = useSetRecoilState<PlanType>(NewPlanRecoil);

  // 추가한 관광지 데이터를 선택한 일정 리스트에 담기
  const eventHandler = (item: any) => {
    setNewPlan((prev: PlanType) => {
      const clonePrev = { ...prev.schedule }; // 기존 데이터 복사
      const cloneItem = { ...item };
      /* 선택한 관광지 데이터에 시간과 메모를 사용자가 사용 할 수 있게 데이터를 초기화*/
      cloneItem['when'] = {
        amPm: '3',
        time: 999,
        hour: '1',
        minute: 0,
      }; // 시간
      cloneItem['memo'] = ''; // 메모
      cloneItem['isSave'] = false;
      /*----------------------------------------------------------*/

      const newPlan: any = {};
      const newEvents = [...clonePrev[pickSchedule.schedule], cloneItem];
      newPlan[pickSchedule.schedule] = newEvents;
      return {
        ...prev,
        schedule: { ...prev.schedule, ...newPlan },
      };
    });
  };

  return (
    <TourListContainer>
      <MyWish onClick={() => setIsShowMyWish((prev) => !prev)}>
        <BsFlagFill size={20} color={'green'} />

        <ShowMyWish>저장한 장소만 보기</ShowMyWish>
      </MyWish>
      {!!list?.length &&
        list.map((item: any, index: number) => {
          if (!!item) {
            return (
              <SpotItem key={index}>
                {/* <div
                  style={{
                    width: '30%',
                    textAlign: 'center',
                    margin: 'auto',
                    display: 'block',
                  }}
                > */}
                {!!item.firstimage ? (
                  <SpotImg
                    onClick={() =>
                      window.open(`/detail/${item.contentid}`, '_blank')
                    }
                    src={`https://${item.firstimage.slice(7)}`}
                  ></SpotImg>
                ) : (
                  <SpotImg
                    onClick={() =>
                      window.open(`/detail/${item.contentid}`, '_blank')
                    }
                    src={require('@/assets/marker_S.webp').default}
                  ></SpotImg>
                )}
                {/* </div> */}
                <SpotInfo>
                  <SpotTitle
                    onClick={() =>
                      window.open(`/detail/${item.contentid}`, '_blank')
                    }
                  >
                    {item.title}
                  </SpotTitle>
                  <SpotEtc>{categoryKor[item.cat3]}</SpotEtc>
                  <SpotEtc>{item.addr1}</SpotEtc>
                </SpotInfo>
                <SpotSaveButton>
                  <SaveButton onClick={() => eventHandler(item)}>
                    <BsFlagFill size={20} color={'#8AB6D6'} />
                  </SaveButton>
                </SpotSaveButton>
              </SpotItem>
            );
          } else {
            <div style={{ height: 200 }}>마지막 검색 결과 입니다</div>;
          }
        })}
    </TourListContainer>
  );
};

export default TourList;

const TourListContainer = styled.div``;
const MyWish = styled.div`
  margin: 25px 0;
  display: flex;
  cursor: pointer;
  align-items: end;
`;
const ShowMyWish = styled.p`
  font-size: 15px;
  color: gray;
  margin-left: 6px;
  line-height: 20px;
`;
const CheckShowMyWish = styled.input`
  border-radius: 40%;
  border: 1px solid black;
  width: 15px;
  height: 15px;
  appearance: none;
  :checked {
    background: grey;
    border: none;
  }
`;

const SpotItem = styled.div`
  height: 90px;
  width: 100%;
  border-radius: 10px;

  margin: 15px 0;
  display: flex;
  overflow: hidden;
  //box-shadow: 1px 1px 1px 1px #004a7c;
  box-shadow: 6px 6px 14px -3px rgba(0, 0, 0, 0.15);
`;

const SpotImg = styled.img`
  width: 30%;

  /* height: 100%; */
  cursor: pointer;
`;

const SpotInfo = styled.div`
  width: 55%;
  height: 100%;
  display: inline-grid;
  padding: 5px 10px;
  text-align: center;
  align-items: center;
  color: black;
`;
const SpotTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  height: auto;
  cursor: pointer;
`;

const SpotEtc = styled.div`
  font-size: 10px;
  height: auto;
  line-height: 14px;
`;

const SpotSaveButton = styled.div`
  width: 15%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  place-items: center;
`;

const SaveButton = styled.button`
  background-color: white;
  width: 100%;
`;
