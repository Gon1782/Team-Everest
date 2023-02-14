import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook, GrTwitter } from 'react-icons/gr';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { auth, db } from '@/common/api/firebase';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  setPersistence,
  signInWithPopup,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import useInput from '@/hooks/useInput';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atom/LoginToggle';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

type Provider = GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider;

const LoginTab = () => {
  const navigate = useNavigate();
  const [_, setCheck] = useRecoilState(LoginState);

  // 이메일 로그인 해야함 귀찮아서 나중에
  const [email, emailChange, resetEmail] = useInput('');
  const [password, passwordChange, resetPassword] = useInput('');
  const [visible, setVisible] = useState(false);

  const reset = () => {
    resetEmail();
    resetPassword();
  };

  const emailLogin = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // 소셜 로그인
  const social = (provider: Provider) => {
    signInWithPopup(auth, provider).then(async (res) => {
      navigate('/main');
      //userDB 생성
      const docRef = doc(db, 'users', `${res.user.uid}`);
      const data = await getDoc(docRef);
      const newData = {
        uid: res.user.uid,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
        myPlanner: [{}],
        MyReview: [{}],
      };
      if (!data.data()) {
        try {
          await setDoc(docRef, newData);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const socialLogin = (provider: Provider) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        social(provider);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <LoginInputContainer>
        <LoginInputBox>
          <div style={{ fontSize: 24 }}>E-Mail</div>
          <LoginInput
            type="text"
            name="email"
            value={email}
            onChange={(e) => emailChange(e)}
          />
          <InputBtn onClick={() => resetEmail()}>X</InputBtn>
        </LoginInputBox>
        <LoginInputBox>
          <div style={{ fontSize: 24 }}>Password</div>
          <LoginInput
            type={visible ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => passwordChange(e)}
          />
          <InputBtn
            onClick={() => setVisible(true)}
            style={{ display: visible ? 'none' : 'flex' }}
          >
            <AiFillEye size={22} />
          </InputBtn>
          <InputBtn
            onClick={() => setVisible(false)}
            style={{ display: visible ? 'flex' : 'none' }}
          >
            <AiFillEyeInvisible size={22} />
          </InputBtn>
        </LoginInputBox>
      </LoginInputContainer>
      <LoginBtnConatiner>
        <LoginBtn>Log in</LoginBtn>
        <RegisterBtn onClick={() => setCheck(false)}>
          회원가입하러가기
        </RegisterBtn>
        <SocialLoginBtnBox>
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
        </SocialLoginBtnBox>
      </LoginBtnConatiner>
    </>
  );
};

export default LoginTab;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const LoginInputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: auto;
`;

const LoginInput = styled.input`
  height: 1.5rem;
  padding: 0.5rem;
  margin-top: 1rem;
  border: none;
  border-bottom: 1px solid black;
  font-size: 22px;
`;
const InputBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0.5rem;
  border: none;
  background-color: lightgray;
  border-radius: 50%;
  font-size: 22px;
`;
const LoginBtnConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;
const LoginBtn = styled.button`
  cursor: pointer;
  width: 85%;
  height: 50px;
  font-size: 22px;
  border: none;
`;
const RegisterBtn = styled.button`
  cursor: pointer;
  font-size: 1rem;
  background-color: transparent;
  border: none;
`;
const SocialLoginBtnBox = styled.div`
  cursor: pointer;
  display: flex;
  gap: 2rem;
`;
