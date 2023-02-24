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

  const { planUniqueId, userId } = useParams() as {
    planUniqueId: string;
    userId: string;
  };

  const [isSidePageView, setIsSidePageView] = useRecoilState(IsSidePageView);
  const [_, setIsCalenderView] = useRecoilState(IsCalenderView);

  // 이 페이지에서 생성한 플랜
  const [plan, setPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  //const resetPlan = useResetRecoilState(NewPlanRecoil);
  const [planName, setPlanName] = useState('');

  // 이거 다시짜기, 중간 발표후에 다시
  const connectionDB = (key: string, isShow?: boolean) => {
    if (window.confirm(`해당 일정을 ${key} 하시겠습니까?`)) {
      try {
        if (key === '저장' && isShow !== undefined) {
          if (!!!planName) return alert('일정 제목을 입력해주세요');

          addPlan(plan, planName, uid, isShow);
        }
        if (key === '수정' && isShow !== undefined)
          updatePlan(plan, planName, uid, planUniqueId, isShow);
        if (key === '북마크 저장')
          saveOtherPlan(plan, planName, uid, userId, planUniqueId);
        if (key === '삭제') popPlan(uid, planUniqueId);
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
    if (!!planUniqueId) {
      setLoading(true);
      const userDB: any = await getUserDB(userUid);

      const [plan] = userDB['myPlanner'].filter(
        (item: any) => Number(planUniqueId) === item.planUniqueId,
      );
      console.log(plan);
      setPlan(plan);
      setPlanName(plan['name']);

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
    console.log(userId);
    if (planUniqueId !== 'write') {
      getPlan(userId); // 해당 일정 가져오기
    } else {
      if (!uid) {
        alert('로그인 후 이용해 주세요');
        navigate('/login');
      }
      setLoading(true);

      const newSchedule: any = {};
      const initSchedule = dateToString(new Date());
      newSchedule[initSchedule] = [];
      //plan 리코일데이터 onSet 짜놓기
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
        planUniqueId: 0,
        isDelete: false,
        bookmarkCount: 0,
      });

      setPlanName('');
      setAuthority({
        write: true,
        view: false,
        update: false,
      });
      //resetPlan();
      setLoading(false);
    }
    setIsSidePageView(false);
    setIsCalenderView(false);

    return () => {
      resetInitLocation();
    };
  }, [planUniqueId]);
  if (loading) return <>로딩즁</>;

  return (
    <>
      <div
        style={{
          opacity: isSidePageView ? 0.15 : 1,
          pointerEvents: isSidePageView ? 'none' : 'auto',
        }}
      >
        {/* <div style={{ backgroundColor: rgba<>(145, 143, 143, 0.4)}}> */}
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
              {!!uid && userId !== uid && (
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
                  <button onClick={() => connectionDB('수정', true)}>
                    발행
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => connectionDB('저장', false)}>
                    임시저장
                  </button>
                  <button onClick={() => connectionDB('저장', true)}>
                    발행
                  </button>
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
      </div>
      <>{isSidePageView && <SidePage />}</>
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
  margin: 20px 0 50px 0;

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
