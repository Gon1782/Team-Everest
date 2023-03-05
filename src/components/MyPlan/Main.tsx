import { useEffect, useRef, useState } from 'react';
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
import { PlanBtn } from './style/common';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import useModal from '@/hooks/useModal';
import { zIndex } from 'html2canvas/dist/types/css/property-descriptors/z-index';
const MyPlan = () => {
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
  //

  const firstCheck = () => {
    // 추가한 일정들이 있는지 확인
    let eventCount = 0;
    Object.values(plan.schedule).filter((item) => (eventCount += item.length));

    if (!!!planName) {
      alert('제목을 입력해주세요!');
      return true;
    }

    if (!eventCount) {
      alert('일정을 추가해주세요!');
      return true;
    }

    return false;
  };

  const asking = (key: string) => {
    if (window.confirm(`해당 일정을 ${key} 하시겠습니까?`)) {
      return true;
    } else {
      return false;
    }
  };
  const clickAddPlan = async (isShow: boolean) => {
    if (firstCheck()) return;
    try {
      asking('저장')
        ? await addPlan(plan, planName, uid, isShow, true).then(() => {
            alert('완료 되었습니다!');
            navigate('/my');
          })
        : alert('취소하셨습니다.');
    } catch (e) {
      alert('잠시 후에 시도해주세요');
    }
  };
  const clickUpdatePlan = async (isShow: boolean) => {
    if (firstCheck()) return;
    try {
      asking('수정')
        ? await updatePlan(
            plan,
            planName,
            uid,
            planUniqueId,
            isShow,
            !!plan?.isMine,
          ).then(() => {
            alert('완료 되었습니다!');
            navigate('/my');
          })
        : alert('취소하셨습니다.');
    } catch (e) {
      alert('잠시 후에 시도해주세요');
    }
  };
  const clickBookMark = async () => {
    try {
      asking('북마크')
        ? await saveOtherPlan(plan, planName, uid, userId, planUniqueId).then(
            () => {
              alert('완료 되었습니다!');
              navigate('/my');
            },
          )
        : alert('취소하셨습니다.');
    } catch (e) {
      alert('잠시 후에 시도해주세요');
    }
  };
  const clickPopPlan = async () => {
    try {
      asking('삭제')
        ? await popPlan(uid, planUniqueId).then(() => {
            alert('완료 되었습니다!');
            navigate('/my');
          })
        : alert('취소하셨습니다.');
    } catch (e) {
      alert('잠시 후에 시도해주세요');
    }
  };

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

      setAuthority({
        write: false,
        view: true,
        update: false,
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
      });
      setUserDB(null);
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
      {isSidePageView && <SidePage />}
      <Main
        style={{
          marginTop: '4%',
          opacity: isSidePageView ? 0.15 : 1,
          pointerEvents: isSidePageView ? 'none' : 'auto',
        }}
      >
        <MyPlanContainer>
          {!!userDB && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',

                alignItems: 'center',
              }}
            >
              <div
                style={{
                  borderRadius: '50%',
                  border: '0px solid',
                  overflow: 'hidden',
                  width: 60,
                  height: 60,
                }}
              >
                <img
                  src={userDB.photoURL}
                  style={{ objectFit: 'cover', width: 60, height: 60 }}
                />
              </div>
              <p style={{ color: 'black', fontWeight: 100 }}>
                {userDB.displayName}
              </p>
            </div>
          )}

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

              {!!uid && userId !== uid && (
                <>
                  <FaBookmark
                    onClick={() => clickBookMark()}
                    style={{ cursor: 'pointer' }}
                    color="red"
                  />
                </>
              )}
            </PlanTitleSection>
          )}
          <PlanDateSection>
            <StartEndDate />
            <PlanMapSection>
              <CalenderView
                setEventRef={setEventRef}
                setScheduleRef={setScheduleRef}
              />
            </PlanMapSection>
            <MyPlanButtonContainer>
              {authority.write ? (
                <div style={{ margin: '40px 0' }}>
                  {authority.update ? (
                    <>
                      <PlanBtn
                        color={'gray'}
                        onClick={() => clickUpdatePlan(false)}
                      >
                        임시저장
                      </PlanBtn>
                      <PlanBtn
                        color={'gray'}
                        onClick={() => clickUpdatePlan(true)}
                      >
                        발행
                      </PlanBtn>
                    </>
                  ) : (
                    <>
                      <PlanBtn
                        color={'gray'}
                        onClick={() => clickAddPlan(false)}
                      >
                        임시저장
                      </PlanBtn>
                      <PlanBtn
                        color={'gray'}
                        onClick={() => clickAddPlan(true)}
                      >
                        발행
                      </PlanBtn>
                    </>
                  )}
                </div>
              ) : (
                userId === uid && (
                  <div style={{ margin: '40px 0' }}>
                    <PlanBtn
                      onClick={() =>
                        setAuthority({ write: true, view: false, update: true })
                      }
                      color={'dbe2ef'}
                    >
                      수정하기
                    </PlanBtn>
                    <PlanBtn onClick={() => clickPopPlan()} color={'dbe2ef'}>
                      삭제하기
                    </PlanBtn>
                  </div>
                )
              )}
            </MyPlanButtonContainer>
          </PlanDateSection>
          <EventMap />
          <PlanScheduleList eventRef={eventRef} scheduleRef={scheduleRef} />
        </MyPlanContainer>
      </Main>
    </>
  );
};

export default MyPlan;
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
  height: 80px;
  margin: 10px 0 10px 0;
  text-align: center;
`;

const PlanDateSection = styled.div`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  /* margin-bottom: 20px; */
  display: contents;
  align-items: center;
`;

const PlanMapSection = styled.div`
  display: contents;
  width: 100%;
`;

const PlanTitleInput = styled.input`
  width: 80%;
  height: 60px;
  font-size: 25px;
  border-bottom: 1px solid gray;
  text-align: center;
  outline: none;
`;

const PlanTitle = styled.p`
  width: 100%;
  height: 60px;
  font-size: 50px;
`;

const MyPlanButtonContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: end;
  /* margin: 30px 0; */
`;
