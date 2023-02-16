import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/common/api/firebase';
import { Document, EachReview } from '@/types/DetailType';
import * as S from './style/ReviewStyled';

interface Props {
  review: EachReview;
}

const ReviewBox = ({ review }: Props) => {
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const uid = !!sessionStorage.getItem(sessionKey)
    ? JSON.parse(sessionStorage.getItem(sessionKey)).uid
    : '';
  const [user, setUser] = useState<Document>();

  const getUser = async () => {
    const docRef = doc(db, 'users', `${review.uid}`);
    const data = await getDoc(docRef);
    setUser(data.data());
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: '1.5rem',
          }}
        >
          <div>
            <span>{user?.displayName}&nbsp;</span>
            <span>{review.createdAt}</span>
          </div>
          <div style={{ display: review.uid === uid ? 'flex' : 'none' }}>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
        <div>{'⭐'.repeat(Number(review.rating))}</div>
        <div>{review.content}</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {review.image.map((x: string, i: number) => {
            return <S.Image src={x} key={i} />;
          })}
        </div>
      </S.ReviewContent>
    </S.Review>
  );
};

export default ReviewBox;