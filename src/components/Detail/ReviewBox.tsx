import { useEffect, useState } from 'react';
import { db } from '@/common/api/firebase';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import * as S from './ReviewStyled';
import { EachReview } from '@/types/DetailType';

interface Props {
  review: EachReview;
}

const ReviewBox = ({ review }: Props) => {
  const [user, setUser] = useState<DocumentData>();

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
            : require('@/assets/Detail/default.png').default
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
            <span>
              | {review.createdAt.slice(0, 4)}-{review.createdAt.slice(4, 6)}-
              {review.createdAt.slice(6, 8)}&nbsp;
              {review.createdAt.slice(8, 10)}:{review.createdAt.slice(10, 12)}
            </span>
          </div>
          <div>
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
