import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserDB } from '@/common/api/userApi';
import { userDBform } from '@/common/utils/forms';
import Profile from '@/components/MyPage/Profile/Profile';
import MyPlanner from '@/components/MyPage/MyPlanner/MyPlanner';
import MyReview from '@/components/MyPage/MyReview/MyReview';
import { UserData } from '@/types/UserType';
import * as S from './style/MyPageStyled';

const Mypage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // Login 판별
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 프로필 수정 가능 여부 판별
  const checkMy = state === uid;
  const LoginCheck = !state && !!uid;

  // Get UserDB
  const [userDB, setUserDB] = useState<UserData>();

  const getUser = useCallback(async (uid: string) => {
    await getUserDB(uid).then((res) => setUserDB(res));
  }, []);

  useEffect(() => {
    if (!state && !uid) {
      alert('로그인 후 이용해 주세요');
      navigate('/login');
    }
    if (!!state) {
      getUser(state);
    } else if (!!uid) {
      getUser(uid);
    }
  }, []);

  if (!userDB) return <S.Loading>로딩중...</S.Loading>;

  const user = !!userDB ? userDB : { ...userDBform };

  return (
    <S.MyPageContainer>
      <Profile
        LoginCheck={LoginCheck}
        checkMy={checkMy}
        user={user}
        getUser={getUser}
      />
      {/* 나의 위시리스트 섹션 아마도? */}
      <MyPlanner user={user} />
      {/* 나의 플래너 섹션 */}
      <MyReview user={user} />
    </S.MyPageContainer>
  );
};

export default Mypage;
