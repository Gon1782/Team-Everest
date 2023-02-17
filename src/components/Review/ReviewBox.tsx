import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDB } from '@/common/api/userApi';
import { defaults } from '@/common/utils/defaults';
import { Document, EachReview } from '@/types/DetailType';
import * as S from './style/ReviewStyled';

interface Props {
  review: EachReview;
}

const ReviewBox = ({ review }: Props) => {
  const navigate = useNavigate();

  // 내 리뷰인지 체크
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';
  const checkMine = review.uid === uid;

  // GET UserDB
  const [user, setUser] = useState<Document>();

  const getUser = async () => {
    const data = await getUserDB(review.uid);
    setUser(data);
  };

  // 프로필 사진
  const { defaultProfile } = defaults();
  const profileImg = !!user?.photoURL ? user?.photoURL : defaultProfile;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <S.Review>
      <S.Profile src={profileImg} />
      <S.ReviewContent>
        <S.ReviewSpace>
          <S.ReviewNickname
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/my', { state: review.uid })}
          >
            {user?.displayName}&nbsp;
          </S.ReviewNickname>
          <S.ReviewBtnBox
            style={{
              display: checkMine ? 'flex' : 'none',
            }}
          >
            <button>수정</button>
            <button>삭제</button>
          </S.ReviewBtnBox>
        </S.ReviewSpace>
        <div>{'⭐'.repeat(Number(review.rating))}</div>
        <div style={{ fontSize: '1.25rem' }}>{review.content}</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {review.image.map((x: string, i: number) => {
            return <S.ReviewImage src={x} key={i} />;
          })}
        </div>
        <span style={{ color: 'gray' }}>{review.createdAt}</span>
      </S.ReviewContent>
    </S.Review>
  );
};

export default ReviewBox;
