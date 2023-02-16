import React, { useState } from 'react';
import { MyPlanRecoil } from '@/recoil/atom/MyPlan';
import { useSetRecoilState } from 'recoil';
import { db } from '@/common/api/firebase';
import CalenderView from './CalenderView';
import { PlanType } from '@/recoil/atom/MyPlan';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import StartEndDate from './StartEndDate';

/*

// user DB
  'plan' : {
    'name' : '' // 플랜 제목
    'startDate': Date,
    'endDate':Date,
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
        
   } },{},{},...
  

  // planner DB
  list : [{
    
    'uid' : '',
    'like' : 0,
   
    'name': '',
    'startDate': Date,
    'endDate':Date,
    'schedule' :  // 플래너 이름  <- MyPlan 컴포넌트에서 처리
      {
        'yyyymmdd' :  // 일정 <- MyPlan 컴포넌트에서 처리
        [
          { // event // 선택한 관광지
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
      return {
        name: event.target.value,
        schedule: { ...prev.schedule },
        startDate: { ...prev.startDate },
        endDate: { ...prev.endDate },
      };
    });
  };

  // //추가한 일정들 디비에 저장하기

  // !!!!!! 꼭 좋아요 키값 추가하기!!!!!
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

  return (
    <div>
      <input
        type="text"
        onChange={makeNewPlanName}
        placeholder="일정 제목을 입력해주세요"
      />
      <StartEndDate />
      <button>저장</button>
      <CalenderView />
    </div>
  );
};

export default MyPlan;
