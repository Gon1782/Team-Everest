import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/common/api/firebase';
import Profile from '@/components/Profile/Profile';
import MyReview from '@/components/MyReview/MyReview';
import { Document } from '@/types/DetailType';
import * as S from './style/MyPageStyled';

const Mypage = () => {
  const navigate = useNavigate();
  // Login 판별
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const uid = !!sessionStorage.getItem(sessionKey)
    ? JSON.parse(sessionStorage.getItem(sessionKey)).uid
    : '';

  // Get UserDB
  const [userDB, setUserDB] = useState<Document>();
  // isLoading
  const [isLoading, setIsLoading] = useState(false);

  const getUserDB = async () => {
    setIsLoading(true);
    const docRef = doc(db, 'users', `${uid}`);
    const data = await getDoc(docRef);
    setUserDB(data.data());
    setIsLoading(false);
  };

  useEffect(() => {
    if (!uid) {
      alert('로그인 후 이용해 주세요');
      navigate('/login');
    }
    if (!!uid) {
      getUserDB();
    }
  }, []);

  if (isLoading) return <S.Loading>로딩중...</S.Loading>;

  return (
    <S.MyPageContainer>
      <Profile user={userDB} getUserDB={getUserDB} />
      {/* 나의 위시리스트 섹션 아마도? */}
      {/* 나의 플래너 섹션 */}
      <MyReview user={userDB} />
    </S.MyPageContainer>
  );
};

export default Mypage;
