import { useEffect, useState } from 'react';
import { Document, EachReview } from '@/types/DetailType';
import * as S from './style/ReviewStyled';
import { getUserDB } from '@/common/api/userApi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  review: EachReview;
}

const ReviewBox = ({ review }: Props) => {
  const navigate = useNavigate();
  // uid 체크
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const uid = !!sessionStorage.getItem(sessionKey)
    ? JSON.parse(sessionStorage.getItem(sessionKey)).uid
    : '';
  // GET UserDB
  const [user, setUser] = useState<Document>();

  const getUser = async () => {
    const data = await getUserDB(review.uid);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <S.Review>
      <S.Profile
        src={
          !!user?.photoURL
            ? user?.photoURL
            : require('@/assets/MyPage/defaultProfile.jpg').default
        }
      />
      <S.ReviewContent>
        <ReviewSpace>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/my', { state: review.uid })}
          >
            {user?.displayName}&nbsp;
          </span>
          <div
            style={{
              display: review.uid === uid ? 'flex' : 'none',
              gap: '1rem',
            }}
          >
            <button>수정</button>
            <button>삭제</button>
          </div>
        </ReviewSpace>
        <div>{'⭐'.repeat(Number(review.rating))}</div>
        <div style={{ fontSize: '1.25rem' }}>{review.content}</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {review.image.map((x: string, i: number) => {
            return <S.Image src={x} key={i} />;
          })}
        </div>
        <span style={{ color: 'gray' }}>{review.createdAt}</span>
      </S.ReviewContent>
    </S.Review>
  );
};

export default ReviewBox;

const ReviewSpace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
`;
