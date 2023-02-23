import { InitLocation } from '@/recoil/atom/MyPlan';
import { useSetRecoilState } from 'recoil';
import { timeHandler } from './MyPlannerHandler';
import styled from 'styled-components';

// 일정 데이터
const Event = ({ index, item }: { index: number; item: any }) => {
  const setInitLocation = useSetRecoilState(InitLocation);

  return (
    <>
      <Eventcontainer
        // style={{ display: 'block' }} // 회수 - 시간, 삭제버튼과 flex 정렬이 안되어 주석처리했어용
        key={index}
        onClick={() =>
          setInitLocation({
            y: parseFloat(item.mapy),
            x: parseFloat(item.mapx),
            level: 3,
          })
        }
      >
        {/* 일정 순서 및 시간 */}
        <EventOrder>
          <EventOrderNumber>{index + 1}</EventOrderNumber>
          <EventTime>{timeHandler(item.when)}</EventTime>
        </EventOrder>
        {/* 일정 장소명 및 시간/메모 설정 영역 */}
        <EventInfo>
          <EventPlace>{item.title}</EventPlace>
        </EventInfo>
        <EventMemo>{item.memo}</EventMemo>
      </Eventcontainer>
    </>
  );
};

export default Event;

const Eventcontainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8px;
`;

//  일정 순서 및 시간
const EventOrder = styled.div`
  /* background-color: #d5d5d5; */
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const EventOrderNumber = styled.div`
  width: 20px;
  height: 20px;
  background-color: #b9b9b9;
  border-radius: 100px;
  font-size: 0.8rem;
  text-align: center;
  line-height: 20px;
  margin-bottom: 5px;
`;

const EventTime = styled.div`
  font-size: 0.8rem;
`;

// 일정 장소명 및 시간/메모 설정 영역
const EventInfo = styled.div`
  width: 100%;
  height: 25px;
  font-size: 13px;
`;

const EventPlace = styled.div`
  height: 34px;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 4px;
`;

const EventMemo = styled.div``;
