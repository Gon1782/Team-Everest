import { Authority, PlanType } from '@/recoil/atom/MyPlan';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  addPlan,
  popPlan,
  saveOtherPlan,
  updatePlan,
} from './MyPlannerHandler';

const HandlerBtn = ({
  userId,
  uid,
  plan,
  planName,
  planUniqueId,
}: {
  userId: string;
  uid: string;
  plan: PlanType;
  planName: string;
  planUniqueId: string;
}) => {
  const [authority, setAuthority] = useRecoilState(Authority);
  const navigate = useNavigate();
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

  return (
    <>
      {authority.write ? (
        <>
          <div></div>
          {authority.update ? ( // 내 일정 수정할때
            <div>
              <PlanBtn color={'gray'} onClick={() => clickUpdatePlan(false)}>
                임시저장
              </PlanBtn>
              <PlanBtn color={'gray'} onClick={() => clickUpdatePlan(true)}>
                발행
              </PlanBtn>
            </div>
          ) : (
            // 내 일정 생성할때
            <div>
              <PlanBtn color={'gray'} onClick={() => clickAddPlan(false)}>
                임시저장
              </PlanBtn>
              <PlanBtn color={'gray'} onClick={() => clickAddPlan(true)}>
                발행
              </PlanBtn>
            </div>
          )}
        </>
      ) : userId === uid ? (
        // 내 일정 볼때
        <div>
          <PlanBtn
            onClick={() =>
              setAuthority({
                write: true,
                view: false,
                update: true,
              })
            }
            color={'dbe2ef'}
          >
            수정하기
          </PlanBtn>
          <PlanBtn onClick={() => clickPopPlan()} color={'dbe2ef'}>
            삭제하기
          </PlanBtn>
        </div>
      ) : (
        // 다른 유저 일정 볼때
        authority.view &&
        userId !== uid && (
          <PlanBookmark onClick={() => clickBookMark()}>
            <FaBookmark color="#EB455F" />
            <PlanBookmarkTxt>일정 추가하기</PlanBookmarkTxt>
          </PlanBookmark>
        )
      )}
    </>
  );
};

export default HandlerBtn;

export const PlanBtn = styled.button<{
  backgroundColor?: string;
  color?: string;
}>`
  width: 80px;
  height: 28px;
  font-size: 0.75rem;
  /* background-color: #004A7C;
    color: #f3f3f3; */
  background-color: #f1f6f9; //${(props) => props.color};
  color: gray; //${(props) => props.color};
  border-radius: 50px;
  margin-left: 10px;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.skyblue};
    color: ${(props) => props.theme.darkgrey};
  }
`;

const PlanBookmark = styled.div`
  width: 140px;
  height: 30px;
  display: flex;
  padding: 0.3rem 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  gap: 8px;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;

const PlanBookmarkTxt = styled.p`
  font-weight: 400;
`;
