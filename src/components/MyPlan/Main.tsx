import React, { useEffect, useRef, useState } from 'react';
import {
  DropDownRef,
  IsSidePageView,
  NewPlanRecoil,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useRecoilValue } from 'recoil';
import { db } from '@/common/api/firebase';
import CalenderView from './CalenderView';
import { PlanType } from '@/recoil/atom/MyPlan';
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import StartEndDate from './StartEndDate';

import { useNavigate, useParams } from 'react-router-dom';
import { stringConvert } from './MyPlannerHandler';
import styled from 'styled-components';
import SidePage from './SidePage';
import Citymap from '../Citymap/Citymap';
import PlanScheduleList from './PlanScheduleList';

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

const MyPlan = () => {
  const navigate = useNavigate();

  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  const [allPlanner, setAllPlanner] = useState<DocumentData>({});
  // 드롭 다운 레퍼런스 객체, useEffect에서 초기화함
  const [dropDownRef, setDropDownRef] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { planIndex } = useParams<string>();

  const isSidePageView = useRecoilValue(IsSidePageView);

  // 이 페이지에서 생성한 플랜
  const [myPlan, setMyPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  const [myPlanList, setMyPlanList] = useState([]);

  const [myPlanName, setMyPlanName] = useState('');
  const [isChangePlanName, setIsChangePlanName] = useState(true);

  const getUserDB = async () => {
    setLoading(true);
    const userRef = doc(db, 'users', `${uid}`);
    const userDB: any = await getDoc(userRef);

    const allPlannerRef = doc(db, 'planners', 'list');
    const allPlannerDB: any = await getDoc(allPlannerRef);

    const userPlanList = userDB.data()['myPlanner'];
    const allPlanner = allPlannerDB.data();

    setMyPlanList(userPlanList);
    setAllPlanner(allPlanner);

    if (planIndex !== 'false' && typeof planIndex !== 'undefined') {
      setMyPlan(userPlanList[parseInt(planIndex)]);
      setMyPlanName(userPlanList[parseInt(planIndex)]['name']);
      setIsChangePlanName(false);
    } else {
      // 다른페이지로 넘어갈때 해주면 될듯
      const newSchedule: any = {};
      const initSchedule = stringConvert(new Date());
      newSchedule[initSchedule] = [];
      setMyPlan({
        name: '',
        startDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
          yyyymmdd: stringConvert(new Date()),
        },
        endDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate() + 3,
          yyyymmdd: stringConvert(new Date()),
        },
        schedule: { ...newSchedule },
      });
      setMyPlanName('');
      setIsChangePlanName(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!uid) {
      alert('로그인 후 이용해 주세요');
      navigate('/login');
    }
    if (!!uid) {
      getUserDB();
    }
  }, [planIndex]);
  if (loading) return <>로딩즁</>;

  //추가한 일정들 디비에 저장하기
  const addPlan = async () => {
    if (!!!myPlanName) return alert('일정 제목을 입력해주세요');
    console.log('newMyPlanner', myPlanList);
    const newMyPlan = {
      name: myPlanName,
      schedule: { ...myPlan.schedule },
      startDate: myPlan.startDate,
      endDate: myPlan.endDate,
    };
    const newMyPlanner = [...myPlanList, { ...newMyPlan }];

    updateDB(newMyPlanner, newMyPlan);
  };
  const updatePlan = async () => {
    const newUserPlan: any = {
      name: myPlanName,
      schedule: { ...myPlan.schedule },
      startDate: myPlan.startDate,
      endDate: myPlan.endDate,
    };
    const newUserPlanList = myPlanList.reduce(
      (sum: any, item: any, index: number) => {
        if (typeof planIndex !== 'undefined') {
          if (parseInt(planIndex) === index) {
            sum.push(newUserPlan);
          } else {
            sum.push(item);
          }
        }
        return sum;
      },
      [],
    );

    updateDB(newUserPlanList, newUserPlan);
  };

  const updateDB = async (newUserPlanList: any, newUserPlan: any) => {
    await updateDoc(doc(db, 'users', uid), {
      myPlanner: [...newUserPlanList],
    });
    await updateDoc(doc(db, 'planners', 'list'), {
      items: [...allPlanner['items'], { ...newUserPlan, uid: uid, like: 0 }],
    });
    alert('저장 성공 하였습니다');
  };

  return (
    <>
      <MyPlanContainer>
        {isChangePlanName ? ( // 일정 만들때
          <PlanTitleSection>
            <PlanTitleInput
              type="text"
              onChange={(e) => setMyPlanName(e.target.value)}
              placeholder="일정 제목을 입력해주세요"
            />
            {planIndex !== 'false' && ( // 프로필에서 자기가 만든 일정 클릭 했을때
              <>
                <button onClick={() => setIsChangePlanName((prev) => !prev)}>
                  완료
                </button>
                <button onClick={() => setIsChangePlanName((prev) => !prev)}>
                  취소
                </button>
              </>
            )}
          </PlanTitleSection>
        ) : (
          <PlanTitleSection>
            <PlanTitle>
              {myPlanName}

              <button onClick={() => setIsChangePlanName((prev) => !prev)}>
                제목수정
              </button>
            </PlanTitle>
          </PlanTitleSection>
        )}
        <PlanDateSection>
          <StartEndDate />
        </PlanDateSection>
        <PlanMapSection>
          <CalenderView setDropDownRef={setDropDownRef} />
        </PlanMapSection>
        <Citymap />
        <PlanScheduleList dropDownRef={dropDownRef} />
      </MyPlanContainer>
      <MyPlanButtonContainer>
        {planIndex === 'false' ? (
          <button onClick={() => addPlan()}>저장</button>
        ) : (
          <button onClick={() => updatePlan()}>수정</button>
        )}
      </MyPlanButtonContainer>
      {isSidePageView && <SidePage />}
    </>
  );
};

export default MyPlan;

const MyPlanContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 2rem;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PlanTitleSection = styled.div`
  width: 100%;
  height: 10px;
  margin: 60px 0;

  /* margin-bottom: 50px; */
`;

const PlanDateSection = styled.div`
  width: 100%;
  height: 30px;

  margin-bottom: 40px;
  display: flex;
`;

const PlanMapSection = styled.div`
  width: 100%;
`;

const PlanTitleInput = styled.input`
  width: 100%;
  height: 60px;
  font-size: 25px;
`;

const PlanTitle = styled.p`
  width: 100%;
  height: 60px;
  font-size: 25px;
`;

const MyPlanButtonContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: end;
  padding: 2rem;
`;
