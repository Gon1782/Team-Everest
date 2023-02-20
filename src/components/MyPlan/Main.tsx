import React, { useEffect, useRef, useState } from 'react';
import {
  DropDownRef,
  IsSidePageView,
  NewPlanRecoil,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { db } from '@/common/api/firebase';
import CalenderView from './CalenderView';
import { PlanType } from '@/recoil/atom/MyPlan';
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import StartEndDate from './StartEndDate';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import SidePage from './SidePage';
import Citymap from '../Citymap/Citymap';
import PlanScheduleList from './PlanScheduleList';
import { getAllPlanner, getUserPlanList } from '@/common/api/plannerApi';
import { getUserDB } from '@/common/api/userApi';
import { dateToString } from './MyPlannerHandler';

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

  // 드롭 다운 레퍼런스 객체, calenderView 컴포넌트에서 초기화함
  const [dropDownRef, setDropDownRef] = useState<any>({});
  const [loading, setLoading] = useState(true);
  //
  const { planIndex, userId } = useParams() as {
    planIndex: string;
    userId: string;
  };

  const isSidePageView = useRecoilValue(IsSidePageView);
  const resetPlan = useResetRecoilState(NewPlanRecoil);

  // 이 페이지에서 생성한 플랜
  const [plan, setPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  // const [planList, setPlanList] = useState([]);

  const [planName, setPlanName] = useState('');
  const [isShowPlanNameInput, setIsShowPlanNameInput] = useState(true);

  const getPlan = async (userUid: string) => {
    if (!!planIndex) {
      setLoading(true);
      const userDB: any = await getUserDB(userUid);
      setPlan(userDB['myPlanner'][parseInt(planIndex)]);
      setPlanName(userDB['myPlanner'][parseInt(planIndex)]['name']);
      setIsShowPlanNameInput(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!uid) {
      alert('로그인 후 이용해 주세요');
      navigate('/login');
    }
    if (!!uid) {
      if (planIndex !== 'write') {
        getPlan(userId); // 해당 일정 가져오기
      } else {
        setLoading(true);
        const newSchedule: any = {};
        const initSchedule = dateToString(new Date());
        newSchedule[initSchedule] = [];

        setPlan({
          name: '',
          startDate: {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            date: new Date().getDate(),
            yyyymmdd: dateToString(new Date()),
          },
          endDate: {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            date: new Date().getDate(),
            yyyymmdd: dateToString(new Date()),
          },
          schedule: { ...newSchedule },
          contentId: 0,
        });
        // resetPlan();
        setPlanName('');
        setIsShowPlanNameInput(true);
        setLoading(false);
      }
    }
  }, [planIndex]);
  if (loading) return <>로딩즁</>;

  //추가한 일정들 디비에 저장하기
  const addPlan = async () => {
    if (!!!planName) return alert('일정 제목을 입력해주세요');
    const planList: any = await getUserPlanList(uid);
    const allPlanner: any = await getAllPlanner();

    const newPlan: any = {
      name: planName,
      schedule: { ...plan.schedule },
      startDate: plan.startDate,
      endDate: plan.endDate,
      contentId: planList['myPlanner'].length,
    };
    const newMyPlanner = [...planList['myPlanner'], { ...newPlan }];

    try {
      // 유저 디비에 저장
      await updateDoc(doc(db, 'users', uid), {
        myPlanner: [...newMyPlanner],
      });

      //모든 플래너 디비에 저장
      newPlan['uid'] = uid;
      newPlan['like'] = 0;
      newPlan['contentId'] = planList['myPlanner'].length;

      await updateDoc(doc(db, 'planners', 'list'), {
        items: [
          ...allPlanner['items'],
          {
            ...newPlan,
          },
        ],
      });
      alert('저장 성공 하였습니다!');
    } catch (e) {
      alert('잠시후 다시 시도해주세요!');
    }
  };

  const updatePlan = async () => {
    const planList: any = await getUserPlanList(uid);
    const contentId = planList['myPlanner'][planIndex]['contentId'];
    const allPlanner: any = await getAllPlanner();

    const newUserPlan: any = {
      name: planName,
      schedule: { ...plan.schedule },
      startDate: plan.startDate,
      endDate: plan.endDate,
      contentId: plan.contentId,
    };

    const newUserPlanList = planList['myPlanner'].reduce(
      (sum: any, item: any, index: number) => {
        if (parseInt(planIndex) === index) {
          sum.push(newUserPlan);
        } else {
          sum.push(item);
        }
        return sum;
      },
      [],
    );

    try {
      //유저 디비에 업데이트
      await updateDoc(doc(db, 'users', uid), {
        myPlanner: [...newUserPlanList],
      });
      //모든 플래너 디비에 업데이트
      const newAllPlanner = allPlanner['items'].reduce(
        (sum: any, item: any) => {
          if (contentId === parseInt(planIndex) && item.uid === uid) {
            // planner 디비에만 필요한 데이터
            newUserPlan['uid'] = uid;
            newUserPlan['like'] = item.like;
            newUserPlan['contentId'] = contentId;
            sum.push(newUserPlan);
          } else {
            sum.push(item);
          }
          return sum;
        },
        [],
      );
      await updateDoc(doc(db, 'planners', 'list'), {
        items: newAllPlanner,
      });
      alert('저장 성공 하였습니다');
    } catch (e) {
      alert('잠시후 다시 시도해주세요!');
    }
  };

  return (
    <>
      <MyPlanContainer>
        {isShowPlanNameInput ? ( // 일정 만들때
          <PlanTitleSection>
            <PlanTitleInput
              type="text"
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="일정 제목을 입력해주세요"
            />
          </PlanTitleSection>
        ) : (
          <PlanTitleSection>
            <PlanTitle>
              {planName}
              <button onClick={() => setIsShowPlanNameInput((prev) => !prev)}>
                제목수정
              </button>
              {planIndex !== 'write' && isShowPlanNameInput && (
                <>
                  <button
                    onClick={() => setIsShowPlanNameInput((prev) => !prev)}
                  >
                    완료
                  </button>
                  <button
                    onClick={() => setIsShowPlanNameInput((prev) => !prev)}
                  >
                    취소
                  </button>
                </>
              )}
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
        {planIndex === 'write' ? (
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
