import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook, GrTwitter } from 'react-icons/gr';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import { LoginValidation } from '@/common/utils/validations';
import useInput from '@/hooks/useInput';
import useModal from '@/hooks/useModal';
import useSignIn from '@/hooks/useSignIn';
import LoginInput from './LoginInput';
import PasswordResetModal from './PasswordResetModal';
import * as S from './style/LoginTabStyled';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const LoginTab = () => {
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

  const emailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = valiDate();
    if (validation) {
      login();
    }
  };

  // 비밀번호 찾기 모달
  const [modal, openModal, closeModal, closeModalIfClickOutside] = useModal();

  return (
    <S.LoginTab onSubmit={(e) => emailLogin(e)}>
      {modal && (
        <PasswordResetModal
          closeModal={closeModal}
          closeModalIfClickOutside={closeModalIfClickOutside}
        />
      )}
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
        <S.RegisterBtn onClick={() => openModal()}>비밀번호 찾기</S.RegisterBtn>
      </S.LoginInputContainer>
      <S.LoginBtnConatiner>
        <S.LoginBtn color="white" backColor="#0034B9">
          로그인 하기
        </S.LoginBtn>
        <S.LoginOrBox>
          <S.LoginLine />
          <S.LoginOr>또는</S.LoginOr>
        </S.LoginOrBox>
        <S.LoginBtn
          type="button"
          color="black"
          backColor="transparent"
          style={{ marginBottom: '1rem' }}
          onClick={() => socialLogin(googleProvider)}
        >
          <FcGoogle size={24} />
          <span>Google 로그인</span>
        </S.LoginBtn>
        <S.LoginBtn
          type="button"
          color="white"
          backColor="#4267B2"
          onClick={() => socialLogin(facebookProvider)}
        >
          <GrFacebook />
          <span>Facebook 로그인</span>
        </S.LoginBtn>
      </S.LoginBtnConatiner>
    </S.LoginTab>
  );
};

export default LoginTab;
