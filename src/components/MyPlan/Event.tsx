import {
  Authority,
  InitLocation,
  NewPlanRecoil,
  PlanType,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timeHandler } from './MyPlannerHandler';
import styled from 'styled-components';
import { FaRegTrashAlt } from 'react-icons/fa';

// 일정 데이터
const Event = ({
  index,
  item,
  scheduleDate,
}: {
  index: number;
  item: any;
  scheduleDate: string;
}) => {
  const setInitLocation = useSetRecoilState(InitLocation);
  const [newPlan, setNewPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  const authority = useRecoilValue(Authority);

  // 일정 삭제
  const popEvent = (date: string, eventIndex: number, eventList: []) => {
    const newEventList = eventList.filter((_, index) => index !== eventIndex);
    const updateSchedule: any = {};
    updateSchedule[date] = newEventList;

    setNewPlan((prev) => {
      return {
        ...prev,
        schedule: { ...prev.schedule, ...updateSchedule },
      };
    });
  };

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
          <EventTime>
            {item.when?.amPm === 1
              ? '오전'
              : item.when?.amPm === 2
              ? '오후'
              : '미정'}
          </EventTime>
          <EventTime>{timeHandler(item.when)}</EventTime>
        </EventOrder>
        {/* 일정 장소명 및 시간/메모 설정 영역 */}
        <EventInfo>
          <EventPlace>
            {item.title}
            {!!item.memo && <EventMemo>{item.memo}</EventMemo>}
          </EventPlace>
        </EventInfo>
        {authority.write && (
          <EventTimeMemoSet>
            <DeleteIcon
              onClick={() =>
                popEvent(scheduleDate, index, newPlan.schedule[scheduleDate])
              }
            ></DeleteIcon>
          </EventTimeMemoSet>
        )}
      </Eventcontainer>
    </>
  );
};

export default Event;

const Eventcontainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
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
  width: 60%;
  height: 25px;
  font-size: 13px;
`;

const EventPlace = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 4px;
  display: contents;
`;

const EventMemo = styled.div`
  font-weight: 100;
`;
const EventTimeMemoSet = styled.div`
  width: 20%;
  margin: 0 auto;
  margin-bottom: 10px;
`;

// 삭제 버튼
const DeleteIcon = styled(FaRegTrashAlt)`
  size: 30px;
  right: 10px;
  top: -48px;
  font-size: 0.9rem;
  color: grey;

  cursor: pointer;
  &:hover {
    color: #c62626;
  }
`;
