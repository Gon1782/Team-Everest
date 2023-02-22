import { useEffect, useState } from 'react';
import {
  Authority,
  InitLocation,
  IsCalenderView,
  IsSidePageView,
  MyWishList,
  NewPlanRecoil,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import CalenderView from './CalenderView';
import { PlanType } from '@/recoil/atom/MyPlan';
import StartEndDate from './StartEndDate';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SidePage from './SidePage';
import EventMap from './EventMap';
import PlanScheduleList from './ScheduleList';
import { getUserDB } from '@/common/api/userApi';
import {
  addPlan,
  dateToString,
  popPlan,
  saveOtherPlan,
  updatePlan,
} from './MyPlannerHandler';

const MyPlan = () => {
  const navigate = useNavigate();

  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : ''; // 드롭 다운 레퍼런스 객체, calenderView 컴포넌트에서 초기화함

  const [dropDownRef, setDropDownRef] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const setMyWishList = useSetRecoilState(MyWishList);
  const [authority, setAuthority] = useRecoilState(Authority);
  const resetInitLocation = useResetRecoilState(InitLocation);

  const { planIndex, userId } = useParams() as {
    planIndex: string;
    userId: string;
  };

  const [isSidePageView, setIsSidePageView] = useRecoilState(IsSidePageView);
  const [_, setIsCalenderView] = useRecoilState(IsCalenderView);
  //const resetPlan = useResetRecoilState(NewPlanRecoil);

  // 이 페이지에서 생성한 플랜
  const [plan, setPlan] = useRecoilState<PlanType>(NewPlanRecoil);

  const [planName, setPlanName] = useState('');

  // 이거 다시짜기
  const connectionDB = (key: string, isShow?: boolean) => {
    if (window.confirm(`해당 일정을 ${key} 하시겠습니까?`)) {
      try {
        if (key === '저장' && isShow !== undefined) {
          if (!!!planName) return alert('일정 제목을 입력해주세요');
          addPlan(plan, planName, uid, isShow);
        }
        if (key === '수정' && isShow !== undefined)
          updatePlan(plan, planName, uid, planIndex, isShow);
        if (key === '북마크 저장')
          saveOtherPlan(plan, planName, uid, userId, planIndex);
        if (key === '삭제') popPlan(uid, planIndex);
        alert('완료 했습니다.');
        navigate('/my');
      } catch (e) {
        return alert('잠시 후에 다시 시도해주세요');
      }
    } else {
      alert('취소 하셨습니다.');
    }
  };

  const getPlan = async (userUid: string) => {
    if (!!planIndex) {
      setLoading(true);
      const userDB: any = await getUserDB(userUid);
      setPlan(userDB['myPlanner'][parseInt(planIndex)]);
      setPlanName(userDB['myPlanner'][parseInt(planIndex)]['name']);

      setMyWishList(userDB['myWishPlace']);
      setAuthority({
        write: false,
        view: true,
        update: false,
      });
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
        // 이부분 나중에 아톰 selector로 다시 짜기
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
          isDelete: false,
          bookmarkCount: 0,
        });

        setPlanName('');
        setAuthority({
          write: true,
          view: false,
          update: false,
        });
        setLoading(false);
      }
      setIsSidePageView(false);
      setIsCalenderView(false);
    }
    return () => {
      resetInitLocation();
    };
  }, [planIndex]);
  if (loading) return <>로딩즁</>;

  return (
    <>
      <MyPlanContainer>
        {authority.write ? ( // 일정 만들때
          <PlanTitleSection>
            <PlanTitleInput
              type="text"
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={
                authority.write
                  ? authority.update
                    ? planName
                    : '제목을 입력해주세요'
                  : planName
              }
            />
          </PlanTitleSection>
        ) : (
          <PlanTitleSection>
            <PlanTitle>{planName}</PlanTitle>
            {userId !== uid && (
              <button onClick={() => connectionDB('북마크 저장')}>
                일정 저장하기
              </button>
            )}
          </PlanTitleSection>
        )}
        <PlanDateSection>
          <StartEndDate />
        </PlanDateSection>
        <PlanMapSection>
          <CalenderView setDropDownRef={setDropDownRef} />
        </PlanMapSection>
        <EventMap />
        <PlanScheduleList dropDownRef={dropDownRef} />
      </MyPlanContainer>
      <MyPlanButtonContainer>
        {authority.write ? (
          <>
            {authority.update ? (
              <>
                <button onClick={() => connectionDB('수정', false)}>
                  임시저장
                </button>
                <button onClick={() => connectionDB('수정', true)}>발행</button>
              </>
            ) : (
              <>
                <button onClick={() => connectionDB('저장', false)}>
                  임시저장
                </button>
                <button onClick={() => connectionDB('저장', true)}>발행</button>
              </>
            )}
          </>
        ) : (
          userId === uid && (
            <>
              <button
                onClick={() =>
                  setAuthority({ write: true, view: false, update: true })
                }
              >
                수정하기
              </button>
              <button onClick={() => connectionDB('삭제')}>삭제하기</button>
            </>
          )
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
