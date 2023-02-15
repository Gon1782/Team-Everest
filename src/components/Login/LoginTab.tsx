import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook, GrTwitter } from 'react-icons/gr';
import * as F from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/common/api/firebase';
import useInput from '@/hooks/useInput';
import { LoginState } from '@/recoil/atom/LoginToggle';
import * as S from './style/LoginTabStyled';

const googleProvider = new F.GoogleAuthProvider();
const facebookProvider = new F.FacebookAuthProvider();
const twitterProvider = new F.TwitterAuthProvider();

type Provider =
  | F.GoogleAuthProvider
  | F.FacebookAuthProvider
  | F.TwitterAuthProvider;

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
    F.setPersistence(auth, F.browserSessionPersistence)
      .then(() => {
        return F.signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // 소셜 로그인
  const social = (provider: Provider) => {
    F.signInWithPopup(auth, provider).then(async (res) => {
      navigate('/main');
      //userDB 생성
      const docRef = doc(db, 'users', `${res.user.uid}`);
      const data = await getDoc(docRef);
      const newData = {
        uid: res.user.uid,
        introduce: '',
        backImage: '',
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
        myPlanner: [],
        MyReview: [],
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
    F.setPersistence(auth, F.browserSessionPersistence)
      .then(() => {
        social(provider);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logOut = () => {
    F.signOut(auth);
  };

  return (
    <>
      <S.LoginInputContainer>
        <S.LoginInputBox>
          <div style={{ fontSize: 24 }}>E-Mail</div>
          <S.LoginInput
            type="text"
            name="email"
            value={email}
            onChange={(e) => emailChange(e)}
          />
          <S.InputBtn onClick={() => resetEmail()}>X</S.InputBtn>
        </S.LoginInputBox>
        <S.LoginInputBox>
          <div style={{ fontSize: 24 }}>Password</div>
          <S.LoginInput
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
      </S.LoginInputContainer>
      <S.LoginBtnConatiner>
        <S.LoginBtn onClick={() => logOut()}>
          임시 로그아웃(이메일로그인안됨)
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
