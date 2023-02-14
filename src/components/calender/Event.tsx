import { useRecoilState, useRecoilValue } from 'recoil';

// 일정 데이터
const Event = ({
  tourData,
  scheduleData,
}: {
  tourData: string;
  scheduleData: string;
}) => {
  return (
    <>
      <div style={{ width: 100, height: 100 }}>
        <div></div>

        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Event;
