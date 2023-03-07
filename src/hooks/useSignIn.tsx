import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  browserSessionPersistence,
  FacebookAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth';
import { auth } from '@/common/api/firebase';
import { getUserDB, postUserDB } from '@/common/api/userApi';
import { userDBform } from '@/common/utils/forms';
import { firebaseLoginValidation } from '@/common/utils/validations';

type Provider = GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider;

const useSignIn = (email: string, password: string, reset: () => void) => {
  const navigate = useNavigate();
  // 파이어베이스 로그인
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate(-1);
        reset();
      })
      .catch((error) => {
        // 에러 alert
        firebaseLoginValidation(error);
      });
  };

  const emailLogin = () => {
    // 세션 스토리지로 로그인
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        login();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // 소셜 로그인
  const social = useCallback((provider: Provider) => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        navigate(-1);
        //userDB 생성
        const data = await getUserDB(res.user.uid);
        const newData = {
          ...userDBform,
          uid: res.user.uid,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
        };
        if (!data) postUserDB(res.user.uid, newData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const socialLogin = useCallback((provider: Provider) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        social(provider);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return [emailLogin, socialLogin] as const;
};

export default useSignIn;
