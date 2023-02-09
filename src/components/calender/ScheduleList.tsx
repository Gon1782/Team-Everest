import React, { useEffect, useState } from 'react';
import { nowSchedule } from '@/atom/calender/scheduleState';
import { useRecoilState, useRecoilValue } from 'recoil';
import CalenderView from './CalenderView';
import ScheduleItem from './ScheduleItem';

const ScheduleList = () => {
  // 저장하기 할때 그때 디비에 저장하게 하기
  // 그전에는 로컬 스토리지에 저장

  const [schedule, setSchedule] = useRecoilState(nowSchedule);
  const [folder, setFolder] = useState('');

  const [showCalender, setShowCalender] = useState(false);

  const onChangeFolder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolder(event.target.value);
  };

  const complete = () => {
    const newFolder: any = {};
    newFolder[folder] = [];
    setSchedule(newFolder);
  };

  const addScheduleToDB = () => {};
  const getScheduleListFromDB = () => {};
  // console.log(schedule);
  // console.log(useRecoilValue(nowSchedule));
  useEffect(() => {
    // 페이지 이동시에 리코일 데이터가 유지 되겠지만
    // 페이지를 나갔다가 다시 들어온 경우를 생각해야함
    // 먼저 db 데이터랑 로컬스토리지 데이터를 비교
    // 같다면 데이터를 그대로 보여주고 다르다면 '작성중인 일정이 있었다' 고 알려주고 복구 시킬껀지 물어보기
    // 리코일에 작업중인 일정 폴더가 있었는지로 조건을 줌
    // if (!!!Object.keys(useRecoilValue(nowSchedule)).length) {
    //   // 페이지에 다시 들어온 경우
    //   // 로컬 스토리지 데이터와 디비 데이터 비교
    //   const getScheduleList = JSON.parse(
    //     localStorage.getItem('nowSchedule') ?? '{}',
    //   );
    //   // setSchedule(getScheduleList);
    //   // setFolder(Object.keys(getScheduleList).length);
    // } else {
    //   setSchedule(useRecoilValue(nowSchedule));
    // }
  });
  return (
    <div>
      {!!!Object.keys(schedule).length ? (
        <>
          <input type="text" onChange={onChangeFolder} />
          <button onClick={complete}>생성</button>
        </>
      ) : (
        <>
          <>
            {Object.keys(schedule)[0]}
            <ScheduleItem folder={folder} />
            <button onClick={() => setShowCalender((prev) => !prev)}>
              일정추가
            </button>
            {showCalender && <CalenderView folder={folder} tourInfo={{}} />}
          </>
          <button onClick={addScheduleToDB}>추가한 일정들 저장하기</button>
          <button onClick={() => setShowCalender((prev) => !prev)}>
            일정 리스트 불러오기
          </button>
        </>
      )}
    </div>
  );
};

export default ScheduleList;
