import { useNavigate } from 'react-router-dom';
import { Document } from '@/types/DetailType';
import * as S from './style/MyPlannerStyled';
import useLoadMore from '@/hooks/useLoadMore';
import { CloneEventMap } from '@/components/MyPlan/EventMap';
import { FaBookmark } from 'react-icons/fa';
import { UserData } from '@/types/UserType';
import styled from 'styled-components';

const MyPlanner = ({
  user,
}: // getUser,
{
  user: UserData;
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
      <S.MyPlannerContainer visible={'visible'}>
        {checkMyPlanner ? (
          myPlanner.map((item: any, index: number) => {
            if (index <= idx) {
              return (
                <div
                  key={index}
                  style={{ textAlign: 'center', position: 'relative' }}
                >
                  <S.BookMarkIcon
                    style={{
                      display: item['isMine'] ? 'none' : 'flex',
                    }}
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
                  <S.MyPlannerName>{item?.name}</S.MyPlannerName>
                </div>
              );
            }
          })
        ) : (
          <S.MyPlannerNone>아직 저장한 일정이 없습니다.</S.MyPlannerNone>
        )}
        {!checkEnd && (
          <S.MyPlannerViewMore onClick={() => ViewMore()}>
            더 보기...
          </S.MyPlannerViewMore>
        )}
      </S.MyPlannerContainer>
    </S.MyPlannerSection>
  );
};

export default MyPlanner;
