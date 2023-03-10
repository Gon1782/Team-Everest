import { useEffect, useMemo, useState } from 'react';
import {
  Authority,
  InitLocation,
  IsCalenderView,
  IsSidePageView,
  MyWishList,
  NewPlanRecoil,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import CalenderView from '@/components/MyPlan/CalenderView';
import { PlanType } from '@/recoil/atom/MyPlan';
import DateAndArea from '@/components/MyPlan/DateAndArea';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SidePage from '@/components/MyPlan/SidePage';
import EventMap from '@/components/MyPlan/EventMap';
import PlanScheduleList from '@/components/MyPlan/ScheduleList';
import { getUserDB } from '@/common/api/userApi';
import { BsCalendarCheck, BsFlagFill } from 'react-icons/bs';
import { dateToString } from '@/components/MyPlan/MyPlannerHandler';
import HandlerBtn from '@/components/MyPlan/HandlerBtn';
import CityHashTag from '@/components/MyPlan/CityHashTag';
import { usePrompt } from '@/hooks/useConfirmExit';

const MyPlanner = () => {
  const navigate = useNavigate();
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : ''; // 드롭 다운 레퍼런스 객체, calenderView 컴포넌트에서 초기화함

  const [eventRef, setEventRef] = useState<any>({});
  const [scheduleRef, setScheduleRef] = useState<any>({});
  const [userDB, setUserDB] = useState<any>();

  const [loading, setLoading] = useState(true);
  const setMyWishList = useSetRecoilState(MyWishList);
  const [authority, setAuthority] = useRecoilState(Authority);
  const [placeholder, setPlaceholder] = useState(false);
  const resetInitLocation = useResetRecoilState(InitLocation);
  const setInitLocation = useSetRecoilState(InitLocation);

  const { planUniqueId, userId } = useParams() as {
    planUniqueId: string;
    userId: string;
  };

  const [isSidePageView, setIsSidePageView] = useRecoilState(IsSidePageView);
  const [_, setIsCalenderView] = useRecoilState(IsCalenderView);
  const [checkSignUp, setCheckSignUp] = useState(false);

  // 이 페이지에서 생성한 플랜
  const [plan, setPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  //const resetPlan = useResetRecoilState(NewPlanRecoil);
  const [planName, setPlanName] = useState('');
  //

  const getPlan = async (userUid: string) => {
    if (!!planUniqueId) {
      setLoading(true);
      const userDB: any = await getUserDB(userUid);

      const [plan] = userDB['myPlanner'].filter(
        (item: any) => Number(planUniqueId) === item.planUniqueId,
      );

      setPlan(plan);
      setPlanName(plan['name']);
      setUserDB(userDB);
      setMyWishList(userDB['myWishPlace']);
      // setInitLocation()
      setAuthority({
        write: false,
        view: true,
        update: userId === uid ? true : false,
        updatingStart: false,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
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
        allCourseCount: 0,
        totalSchedule: 0,
        mainArea: [],
      });
      setUserDB(null);
      setPlanName('');
      setAuthority({
        write: true,
        view: false,
        update: false,
        updatingStart: true,
      });

      setLoading(false);
    }
    setIsSidePageView(false);
    setIsCalenderView(false);

    return () => {
      resetInitLocation();
    };
  }, [planUniqueId]);

  if (loading) return <></>;

  return (
    <>
      {isSidePageView && <SidePage />}
      <Main
      // style={{
      //   opacity: isSidePageView ? 0.15 : 1,
      //   pointerEvents: isSidePageView ? 'none' : 'auto',
      // }}
      >
        <MyPlanContainer>
          <ProfileAndButtonSection>
            {authority.view && ( // 일정을 클릭하고 들어온 경우
              <>
                <ProfileBox onClick={() => navigate('/my', { state: userId })}>
                  <Profile>
                    <img
                      src={
                        !!userDB?.photoURL
                          ? userDB?.photoURL
                          : require('@/assets/MyPage/defaultProfile.webp')
                              .default
                      }
                      style={{ objectFit: 'cover', width: 50, height: 50 }}
                    />
                  </Profile>
                  <ProfileName>{userDB.displayName}</ProfileName>
                </ProfileBox>
                {!!uid &&
                  userId !== uid && ( // 클릭한 일정이 다른 사람 일정인 경우 [일정 저장하기] 버튼 생성
                    <HandlerBtn
                      userId={userId}
                      uid={uid}
                      plan={plan}
                      planName={planName}
                      planUniqueId={planUniqueId}
                    />
                  )}
              </>
            )}
            {(authority.write || authority.update) && ( // 내 일정을 클릭한 경우(update), 일정 만들기(write)로 들어온 경우
              <HandlerBtn
                userId={userId}
                uid={uid}
                plan={plan}
                planName={planName}
                planUniqueId={planUniqueId}
              />
            )}
          </ProfileAndButtonSection>

          {authority.write ? ( // 일정 만들때
            <PlanTitleSection>
              <PlanTitleInput
                type="text"
                onChange={(e) => setPlanName(e.target.value)}
                onFocus={() => setPlaceholder(true)}
                onBlur={() => setPlaceholder(false)}
                placeholder={
                  authority.write
                    ? authority.update
                      ? planName // 수정하기 눌렀을때 원래 제목 보여주기
                      : placeholder // 일정 만들기 눌렀을때
                      ? '' // 클릭시
                      : '제목을 입력해주세요' // 클릭 안했을때
                    : planName
                }
              />
            </PlanTitleSection>
          ) : (
            <PlanTitleSection>
              <PlanTitle>{planName}</PlanTitle>
            </PlanTitleSection>
          )}

          <DateAndArea />
          {!authority.write && (
            <>
              <CityHashTagSection>
                <CityHashTag plan={plan} />
              </CityHashTagSection>
              <PlanInfoSection>
                <PlanCourseInfo>
                  <IconCircle>
                    <IconImage
                      src={
                        'https://img.icons8.com/pastel-glyph/64/004A7C/highway--v2.png'
                      }
                    />
                  </IconCircle>
                  <CourseInfo>
                    <CourseExplain>가야 할 곳들</CourseExplain>
                    <CourseCount>총 {plan.allCourseCount} 코스</CourseCount>
                  </CourseInfo>
                </PlanCourseInfo>
                <PlanCourseInfo>
                  <IconCircle>
                    <BsCalendarCheck
                      style={{
                        color: '#004A7C',
                        width: '24px',
                        height: 'auto',
                      }}
                    />
                  </IconCircle>
                  <CourseInfo>
                    <CourseExplain> 일정</CourseExplain>
                    <CourseCount>
                      {plan.totalSchedule !== 0 && plan.totalSchedule === 1
                        ? '당일치기'
                        : `${plan.totalSchedule - 1}박 ${plan.totalSchedule}일`}
                    </CourseCount>
                  </CourseInfo>
                </PlanCourseInfo>
              </PlanInfoSection>
            </>
          )}

          <CalenderView
            setEventRef={setEventRef}
            setScheduleRef={setScheduleRef}
          />

          <EventMap />
          <PlanScheduleList eventRef={eventRef} scheduleRef={scheduleRef} />
        </MyPlanContainer>
      </Main>
    </>
  );
};

export default MyPlanner;
const Main = styled.div`
  background: transparent;
  border-color: transparent;

  & > * {
    background: rgba(0, 0, 0);
  }
`;

const MyPlanContainer = styled.div`
  width: 45%;
  height: 100%;
  padding: 2rem;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: white;
`;

const PlanTitleSection = styled.div`
  width: 100%;
  text-align: center;
  height: 70px;
`;

const PlanTitleInput = styled.input`
  width: 80%;
  height: 60px;
  font-size: 25px;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
  outline: none;
`;

const PlanTitle = styled.p`
  width: 100%;
  height: 80px;
  font-size: 2.8rem;
  margin-top: 20px;
`;

const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  background-color: #e6e6e6;
  border-radius: 50px;
  font-size: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const ProfileAndButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  border-radius: 50%;
  border: 0px solid;
  overflow: hidden;
  width: 50px;
  height: 50px;
  margin-right: 8px;
`;

const ProfileName = styled.p`
  color: ${(props) => props.theme.black};
  font-weight: 400;
`;

const CityHashTagSection = styled.div`
  display: inline-flex;
  height: 140px;
  text-align: center;
`;
const PlanInfoSection = styled.div`
  display: flex;
  height: 135px;
  width: 100%;
  justify-content: space-around;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 64px;
`;

const PlanCourseInfo = styled.div`
  display: flex;
  width: 190px;
  align-items: center;
`;

const IconImage = styled.img`
  width: 26px;
  height: auto;
  position: absolute;
`;

const CourseInfo = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CourseExplain = styled.p`
  width: 120px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${(props) => props.theme.darkgrey};
  /* text-align: center; */
`;

const CourseCount = styled.p`
  font-size: 20px;
  color: #004a7c;
  font-weight: 700;
`;
