import React, { useEffect, useState } from 'react';
import { MyPlanRecoil } from '@/recoil/atom/MyPlan';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { db } from '@/common/api/firebase';
import CalenderView from './CalenderView';
import Event from './Event';
import { PlanType } from '@/recoil/atom/MyPlan';
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import StartEndDate from './StartEndDate';

/*

// user DB
  'plan' : {
    'name' : '' // 플랜 제목
    'schedule' :  // 플래너 이름  <- MyPlan 컴포넌트에서 처리
      {
        'yyyymmdd' :  // 일정 <- MyPlan 컴포넌트에서 처리
        [
          { // event <- 검색 사이드창에서 처리
            'time':'' , 'name':'장소이름' , 'contentId' : '장소번호',
            '위치x':'x좌표','위치y':'y좌표','memo':'메모값' , 'index' : 1
          },
        ],
        'yyyymmdd' : [
          {
            'time':'15' , 'name':'장소이름' , 'contentId' : '장소번호',
            '위도':'위도값','경도':'경도값','memo':'메모값'
          }
        ],
        location : '',
   } },{},{},...
  

  // planner DB
  list : [{
    'id' : 1
    'uid' : '',
    'like' : 0,
    'location' : '',
    'planName': '',
    'schedule' :  // 플래너 이름  <- MyPlan 컴포넌트에서 처리
      {
        'yyyymmdd' :  // 일정 <- MyPlan 컴포넌트에서 처리
        [
          { // event <- 검색 사이드창에서 처리
            'time':'12' , 'name':'장소이름' , 'contentId' : '장소번호',
            '위도':'위도값','경도':'경도값','memo':'메모값' , 'index' : 1
          }
        ],
        'yyyymmdd' : [
          {
            'time':'15' , 'name':'장소이름' , 'contentId' : '장소번호',
            '위도':'위도값','경도':'경도값','memo':'메모값'
          }
        ]
    },{},{},....]
*/

// My 페이지!
// 이 페이지에서는 플래너 이름과 , 일정 데이터만 처리 할꺼임
const MyPlan = () => {
  // 이 페이지에서 생성한 플랜
  const setPlan = useSetRecoilState<PlanType>(MyPlanRecoil);
  // 이 페이지에서 생성한 플랜 이름
  const [newPlanName, setPlanName] = useState('');
  // 디비에서 가져온 해당유저의 플랜 리스트
  const [myPlannerFromDB, setMyPlannerFromDB] = useState<DocumentData>();

  // 플랜 이름 생성하기
  const makeNewPlanName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlan((prev: PlanType): PlanType => {
      return { name: event.target.value, schedule: { ...prev.schedule } };
    });
  };

  // //추가한 일정들 디비에 저장하기
  // const addPlanToDB = async () => {
  //   await updateDoc(doc(db, 'users', `firebaseUid`), {
  //     myPlanner: { ...myPlannerFromDB, ...MyPlanRecoil },
  //   });
  //   alert('성공');
  // };

  // //추가했던 일정들 불러오기
  // const getPlanListFromDB = () => {
  //   console.log(myPlannerFromDB);
  // };

  //디비에서 해당유저의 데이터 가져오기
  const getUser = async () => {
    const docRef = doc(db, 'users', 'firebaseUid');
    const data = await getDoc(docRef);
    setMyPlannerFromDB(data.data()?.['myPlanner']);
  };

  useEffect(() => {
    // 페이지 이동시에 리코일 데이터가 유지 되겠지만
    // 페이지를 나갔다가 다시 들어온 경우를 생각해야함
    // 먼저 db 데이터랑 로컬스토리지 데이터를 비교
    // 같다면 데이터를 그대로 보여주고 다르다면 '작성중인 일정이 있었다' 고 알려주고 복구 시킬껀지 물어보기
    // 리코일에 작업중인 일정 폴더가 있었는지로 조건을 줌
    //디비에서 데이터 가져오기
    //getUser();
    // if (!!!Object.keys(useRecoilValue(nowPlan)).length) {
    //   // 페이지에 다시 들어온 경우
    //   // 로컬 스토리지 데이터와 디비 데이터 비교
    //   const getNowPlan = JSON.parse(localStorage.getItem('nowPlan') ?? '{}');
    //   // setSchedule(getScheduleList);
    //   // setFolder(Object.keys(getScheduleList).length);
    // } else {
    //   setPlan(useRecoilValue(nowPlan));
    // }
  });
  return (
    <div>
      <input type="text" onChange={makeNewPlanName} />
      <StartEndDate />
      <CalenderView />
    </div>
  );
};

export default MyPlan;
