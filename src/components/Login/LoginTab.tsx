import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook, GrTwitter } from 'react-icons/gr';
import * as F from 'firebase/auth';
import { auth } from '@/common/api/firebase';
import { getUserDB, postUserDB } from '@/common/api/userApi';
import {
  emailRegex,
  firebaseLoginValidation,
  pwRegex,
} from '@/common/utils/validations';
import useInput from '@/hooks/useInput';
import { LoginState } from '@/recoil/atom/Login';
import * as S from './style/LoginTabStyled';

type Provider =
  | F.GoogleAuthProvider
  | F.FacebookAuthProvider
  | F.TwitterAuthProvider;

const googleProvider = new F.GoogleAuthProvider();
const facebookProvider = new F.FacebookAuthProvider();
const twitterProvider = new F.TwitterAuthProvider();

const LoginTab = () => {
  const navigate = useNavigate();
  // 로그인 회원가입 토글
  const [_, setCheck] = useRecoilState(LoginState);

  // 이메일 로그인
  const [email, emailChange, resetEmail] = useInput('');
  const [password, passwordChange, resetPassword] = useInput('');
  const [visible, setVisible] = useState(false);

  // 값 초기화
  const reset = useCallback(() => {
    resetEmail();
    resetPassword();
    setVisible(false);
  }, []);

  // 유효성검사
  const emailCheck = !email || email.match(emailRegex);
  const pwCheck = !password || password.match(pwRegex);

  // 파이어베이스 로그인
  const login = () => {
    F.signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/main');
        reset();
      })
      .catch((error) => {
        // 에러 alert
        firebaseLoginValidation(error);
      });
  };

  const emailLogin = () => {
    if (!emailCheck) return;
    if (!pwCheck) return;
    // 세션 스토리지로 로그인
    F.setPersistence(auth, F.browserSessionPersistence)
      .then(() => {
        login();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // 소셜 로그인
  const social = useCallback((provider: Provider) => {
    F.signInWithPopup(auth, provider)
      .then(async (res) => {
        navigate('/main');
        //userDB 생성
        const data = await getUserDB(res.user.uid);
        const newData = {
          uid: res.user.uid,
          introduce: '',
          backImage:
            'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
          myPlanner: [],
          MyReview: [],
          myWishPlace: [],
        };
        if (!data) postUserDB(res.user.uid, newData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const socialLogin = useCallback((provider: Provider) => {
    F.setPersistence(auth, F.browserSessionPersistence)
      .then(() => {
        social(provider);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const logOut = () => {
    F.signOut(auth);
  };

  return (
    <>
      <S.LoginInputContainer>
        <S.LoginInputBox>
          <S.InputTitle style={{ marginBottom: '1rem' }}>E-Mail</S.InputTitle>
          <S.LoginInput
            tabIndex={1}
            type="text"
            name="email"
            value={email}
            onChange={(e) => emailChange(e)}
          />
          <S.InputBtn onClick={() => resetEmail()}>X</S.InputBtn>
        </S.LoginInputBox>
        <S.Warning
          style={{
            visibility: emailCheck ? 'hidden' : 'visible'
          }}
        >
          ※이메일 형식에 맞게 입력해주세요
        </S.Warning>
        <S.LoginInputBox>
          <S.InputTitle style={{ marginBottom: '1rem' }}>Password</S.InputTitle>
          <S.LoginInput
            tabIndex={2}
            type={visible ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => passwordChange(e)}
          />
          <S.InputBtn
            onClick={() => setVisible(true)}
            style={{ display: visible ? 'none' : 'flex' }}
          >
            <AiFillEye size={22} />
          </S.InputBtn>
          <S.InputBtn
            onClick={() => setVisible(false)}
            style={{ display: visible ? 'flex' : 'none' }}
          >
            <AiFillEyeInvisible size={22} />
          </S.InputBtn>
        </S.LoginInputBox>
        <S.Warning
          style={{
            visibility: pwCheck ? 'hidden' : 'visible',
          }}
        >
          ※비밀번호를 확인해주세요
        </S.Warning>
      </S.LoginInputContainer>
      <S.LoginBtnConatiner>
        <S.LoginBtn tabIndex={3} onClick={() => emailLogin()}>
          Log in
        </S.LoginBtn>
        <S.RegisterBtn onClick={() => setCheck(false)}>
          회원가입하러가기
        </S.RegisterBtn>
        <S.SocialLoginBtnBox>
          <FcGoogle size={45} onClick={() => socialLogin(googleProvider)} />
          <GrFacebook
            size={45}
            color={'#4267B2'}
            onClick={() => socialLogin(facebookProvider)}
          />
          <GrTwitter
            size={45}
            color={'#1DA1F2'}
            onClick={() => socialLogin(twitterProvider)}
          />
        </S.SocialLoginBtnBox>
        <S.LoginBtn onClick={() => logOut()}>임시 로그아웃</S.LoginBtn>
      </S.LoginBtnConatiner>
    </>
  );
};

export default LoginTab;
