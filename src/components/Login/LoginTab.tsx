import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook, GrTwitter } from 'react-icons/gr';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import { LoginValidation } from '@/common/utils/validations';
import useInput from '@/hooks/useInput';
import useSignIn from '@/hooks/useSignIn';
import { LoginState } from '@/recoil/atom/Login';
import LoginInput from './LoginInput';
import * as S from './style/LoginTabStyled';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const LoginTab = () => {
  // 로그인 회원가입 토글
  const setCheck = useSetRecoilState(LoginState);

  // 이메일 로그인
  const [email, emailChange, resetEmail] = useInput('');
  const [password, pwChange, resetPassword] = useInput('');

  // 값 초기화
  const reset = useCallback(() => {
    resetEmail();
    resetPassword();
  }, []);

  // 유효성검사
  const [emailCheck, pwCheck, valiDate] = LoginValidation(email, password);

  // 로그인
  const [login, socialLogin] = useSignIn(email, password, reset);

  const emailLogin = () => {
    const validation = valiDate();
    if (validation) {
      login();
    }
  };

  return (
    <>
      <S.LoginInputContainer>
        <LoginInput
          name="email"
          value={email}
          check={emailCheck}
          onChange={emailChange}
          reset={resetEmail}
        />
        <LoginInput
          name="password"
          value={password}
          check={pwCheck}
          onChange={pwChange}
          reset={resetPassword}
        />
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
      </S.LoginBtnConatiner>
    </>
  );
};

export default LoginTab;
