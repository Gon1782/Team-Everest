import { useNavigate } from 'react-router-dom';
import { Document } from '@/types/DetailType';
import * as S from './style/MyPlannerStyled';
import useLoadMore from '@/hooks/useLoadMore';

const MyPlanner = ({ user }: { user: Document }) => {
  const navigate = useNavigate();

  const myPlanner = user.myPlanner?.filter((x: any) => x.isDelete === false);
  const checkMyPlanner = !!myPlanner?.length;

  const moveToMyPlan = (item: any, index: number) => {
    navigate(`/planner/${user['uid']}/${index}`);
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
                <S.MyPlannerBox
                  key={item.name}
                  onClick={() => moveToMyPlan(item, index)}
                >
                  <span>{item?.name}</span>
                </S.MyPlannerBox>
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
