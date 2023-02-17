import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import { auth } from '@/common/api/firebase';
import { postUserDB } from '@/common/api/userApi';
import { userDBform } from '@/common/utils/forms';
import { LoginState } from '@/recoil/atom/Login';

const useSignUp = (
  email: string,
  password: string,
  nickname: string,
  reset: () => void,
) => {
  const navigate = useNavigate();
  const setCheckLogin = useSetRecoilState(LoginState);

  const signUp = () => {
    // 회원가입
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        navigate('/main');
        setCheckLogin(true);
        //userDB 생성
        const newData = {
          ...userDBform,
          uid: res.user.uid,
          displayName: nickname,
          email: res.user.email,
        };
        await postUserDB(res.user.uid, newData);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const emailSignup = useCallback(() => {
    // 세션 스토리지로 회원가입
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signUp();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return emailSignup;
};

export default useSignUp;
