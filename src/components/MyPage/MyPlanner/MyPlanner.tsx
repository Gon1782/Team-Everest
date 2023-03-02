import { useNavigate } from 'react-router-dom';
import { Document } from '@/types/DetailType';
import * as S from './style/MyPlannerStyled';
import useLoadMore from '@/hooks/useLoadMore';
import { CloneEventMap } from '@/components/MyPlan/EventMap';
import { FaBookmark } from 'react-icons/fa';
import { useEffect } from 'react';

const MyPlanner = ({
  user,
}: // getUser,
{
  user: Document;
  // getUser: (uid: string) => Promise<void>;
}) => {
  const navigate = useNavigate();

  const myPlanner = user.myPlanner?.filter((x: any) => x.isDelete === false);
  const checkMyPlanner = !!myPlanner?.length;

  const moveToMyPlan = (item: any) => {
    navigate(`/planner/${user['uid']}/${item.planUniqueId}`);
  };

  const [idx, checkEnd, ViewMore] = useLoadMore(myPlanner);

  return (
    <S.MyPlannerSection>
      <S.MyPlannerTitle>내가 저장한 일정 리스트</S.MyPlannerTitle>
      <S.MyPlannerContainer
        style={{ overflowX: idx < 3 ? 'hidden' : 'scroll' }}
      >
        {checkMyPlanner ? (
          myPlanner.map((item: any, index: number) => {
            if (index <= idx) {
              return (
                <div style={{ textAlign: 'center' }}>
                  <FaBookmark
                    style={{
                      display: item['isMine'] ? 'none' : 'flex',
                      position: 'relative',
                    }}
                    color="#0A77D1"
                    size="20"
                  />
                  <S.MyPlannerBox
                    key={item.name}
                    onClick={() => moveToMyPlan(item)}
                  >
                    <CloneEventMap
                      plan={item}
                      startDate={item['startDate']['yyyymmdd']}
                      height={300}
                    ></CloneEventMap>
                  </S.MyPlannerBox>
                  <span>{item?.name}</span>
                </div>
              );
            }
          })
        ) : (
          <S.MyPlannerNone>아직 일정이 없음 짜러가셈</S.MyPlannerNone>
        )}
        {!checkEnd && (
          <S.MyPlannerBox onClick={() => ViewMore()}>
            View More...
          </S.MyPlannerBox>
        )}
      </S.MyPlannerContainer>
    </S.MyPlannerSection>
  );
};

export default MyPlanner;
