import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  NewPlanRecoil,
  PlanType,
  PickScheduleRecoil,
  TourListRecoil,
  MyWishList,
} from '@/recoil/atom/MyPlan';
import { useEffect, useRef, useState } from 'react';
import { getTourList } from '@/common/api/tourApi';
import styled from 'styled-components';

const TourList = () => {
  const setNewPlan = useSetRecoilState<PlanType>(NewPlanRecoil);

  // 선택한 일정
  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  // 보여줄 데이터
  const [dataList, setDataList] = useState<any>([]);
  // 관광지 데이터
  const tourList = useRecoilValue(TourListRecoil);
  //관광지 위시 리스트 데이터
  const myWishList = useRecoilValue(MyWishList);
  //관광지 위시 리스트만 보기
  const [isShowMyWish, setIsShowMyWish] = useState(false);

  // 추가한 관광지 데이터를 선택한 일정 리스트에 담기
  const eventHandler = (item: any) => {
    // if (window.confirm('이 관광지를 현재 일정에 추가하시겠습니까?')) {
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
    // alert('완료되었습니다')
    // }
  };

  useEffect(() => {
    if (isShowMyWish) {
      setDataList(myWishList);
    } else {
      setDataList(tourList);
    }
  }, [isShowMyWish]);

  useEffect(() => {
    setDataList(tourList);
    setIsShowMyWish(false);
  }, [tourList]);

  return (
    <TourListContainer>
      <MyWish>
        <CheckShowMyWish
          type="checkbox"
          checked={isShowMyWish}
          onChange={() => setIsShowMyWish((prev) => !prev)}
        />
        <ShowMyWish>저장한 장소만 보기</ShowMyWish>
      </MyWish>
      {!!dataList?.length ? (
        dataList.map((item: any, index: number) => {
          return (
            <SpotItem key={index}>
              {item.firstimage !== '' ? (
                <SpotImg src={item.firstimage}></SpotImg>
              ) : (
                <SpotImg src={require('@/assets/marker.png').default}></SpotImg>
              )}
              <SpotInfo>
                <SpotTitle>{item.title}</SpotTitle>
                <SpotAdress>{item.addr1}</SpotAdress>
              </SpotInfo>
              <SpotSaveButton>
                <SaveButton onClick={() => eventHandler(item)}>+</SaveButton>
              </SpotSaveButton>
            </SpotItem>
          );
        })
      ) : (
        <>검색 결과</>
      )}
    </TourListContainer>
  );
};

export default TourList;

const TourListContainer = styled.div``;
const MyWish = styled.div`
  margin: 25px 0;
  display: flex;
`;
const ShowMyWish = styled.p`
  font-size: 15px;
  color: gray;
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
  height: 120px;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  margin: 15px 0;
  display: flex;
  overflow: hidden;
`;

const SpotImg = styled.img`
  width: 25%;
  height: 100%;
`;

const SpotInfo = styled.div`
  width: 65%;
  height: 100%;
  display: inline-block;
  padding: 5px 10px;
`;
const SpotTitle = styled.div`
  font-size: 25px;
`;
const SpotAdress = styled.div`
  font-size: 15px;
`;

const SpotSaveButton = styled.div`
  width: auto;
  height: 100%;
  margin: 0 auto;
  display: flex;
  place-items: center;
`;

const SaveButton = styled.button`
  background-color: white;
`;
