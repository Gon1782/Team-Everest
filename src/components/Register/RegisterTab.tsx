import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useInputs from '@/hooks/useInputs';
import { emailRegex, pwRegex } from '@/common/utils/validations';
import * as S from '../Login/style/LoginTabStyled';
import { useState, useEffect } from 'react';
import { auth } from '@/common/api/firebase';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getAllUser, postUserDB } from '@/common/api/userApi';
import { Document } from '@/types/DetailType';
import { UserData } from '@/types/UserType';

const RegisterTab = () => {
  const navigate = useNavigate();
  // GET UserDB
  const [userDB, setUserDB] = useState<Document>();

  const getUser = async () => {
    const data = await getAllUser();
    setUserDB(data);
  };

  // 비밀번호 보이기
  const [pwVisible, setVisible] = useState(false);
  const [checkPwVisible, setCheckVisible] = useState(false);
  // inputs
  const form = {
    email: '',
    password: '',
    checkPassword: '',
    nickname: '',
  };
  const [state, onChange, reset] = useInputs(form);

  // 유효성 검사
  const emailCheck = !state.email || state.email.match(emailRegex);
  const emailDupCheck = !userDB?.filter(
    (x: UserData) => x.email === state.email,
  ).length;
  const pwCheck = !state.password || state.password.match(pwRegex);
  const pwDoubleCheck =
    !state.checkPassword || state.password === state.checkPassword;
  const nicknameCheck = state.nickname.length >= 0 && state.nickname.length < 9;
  const nicknameDupCheck = !userDB?.filter(
    (x: UserData) => x.displayName === state.nickname,
  ).length;

  // 회원가입
  const signUp = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then(async (res) => {
        navigate('/main');
        //userDB 생성
        const newData = {
          uid: res.user.uid,
          introduce: '',
          backImage:
            'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          displayName: state.nickname,
          photoURL: '',
          email: res.user.email,
          myPlanner: [],
          MyReview: [],
          myWishPlace: [],
        };
        await postUserDB(res.user.uid, newData);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const emailSignup = () => {
    // 유효성 검사
    if (!emailCheck) return;
    if (!pwCheck) return;
    if (!nicknameCheck) return;
    if (state.nickname.length > 8) return;
    if (!emailDupCheck) return;
    if (!nicknameDupCheck) return;
    if (!state.email) return alert('이메일을 입력해주세요');
    if (!state.password) return alert('비밀번호를 입력해주세요');
    if (!state.checkPassword) return alert('비밀번호를 확인해주세요');
    if (!state.nickname) return alert('닉네임을 입력해주세요.');
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signUp();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <S.RegisterInputContainer>
        <S.LoginInputBox>
          <S.InputTitle style={{ margin: '1rem 0 .5rem' }}>E-Mail</S.InputTitle>
          <S.MoreInfo>영문, 숫자로 이루어진 이메일을 입력해주세요.</S.MoreInfo>
          <S.LoginInput
            tabIndex={1}
            type="text"
            name="email"
            value={state.email}
            onChange={(e) => onChange(e)}
          />
          {/* 이메일 인증인데 추가할지 말지 모름 */}
          {/* <InputBtn>
            <AiOutlineCheck size={22} />
          </InputBtn> */}
        </S.LoginInputBox>
        <S.Warning
          style={{
            display: emailCheck ? 'none' : 'block',
          }}
        >
          ※ 이메일 형식에 맞게 입력해주세요.
        </S.Warning>
        <S.Warning
          style={{
            display: emailCheck ? 'block' : 'none',
            visibility: !!state.email ? 'visible' : 'hidden',
            color: emailDupCheck ? 'lightgreen' : 'red',
          }}
        >
          {emailDupCheck ? '사용가능한 이메일입니다.' : '중복된 이메일입니다.'}
        </S.Warning>
        <S.LoginInputBox>
          <S.InputTitle style={{ margin: '.5rem 0' }}>Password</S.InputTitle>
          <S.MoreInfo>
            특수문자가 포함된 8자 이상의 비밀번호로 설정해 주세요.
          </S.MoreInfo>
          <S.LoginInput
            tabIndex={2}
            type={pwVisible ? 'text' : 'password'}
            name="password"
            placeholder="비밀번호"
            value={state.password}
            onChange={(e) => onChange(e)}
          />
          <S.InputBtn
            style={{ display: pwVisible ? 'none' : 'flex' }}
            onClick={() => setVisible(true)}
          >
            <AiFillEye size={22} />
          </S.InputBtn>
          <S.InputBtn
            style={{ display: pwVisible ? 'flex' : 'none' }}
            onClick={() => setVisible(false)}
          >
            <AiFillEyeInvisible size={22} />
          </S.InputBtn>
        </S.LoginInputBox>
        <S.Warning
          style={{
            visibility: pwCheck ? 'hidden' : 'visible',
          }}
        >
          ※ 비밀번호 형식에 맞게 입력해주세요.
        </S.Warning>
        <S.PasswordCheckBox>
          <S.PasswordCheckInput
            tabIndex={3}
            type={checkPwVisible ? 'text' : 'password'}
            name="checkPassword"
            placeholder="비밀번호 확인"
            value={state.checkPassword}
            onChange={(e) => onChange(e)}
          />
          <S.InputBtn
            style={{ display: checkPwVisible ? 'none' : 'flex' }}
            onClick={() => setCheckVisible(true)}
          >
            <AiFillEye size={22} />
          </S.InputBtn>
          <S.InputBtn
            style={{ display: checkPwVisible ? 'flex' : 'none' }}
            onClick={() => setCheckVisible(false)}
          >
            <AiFillEyeInvisible size={22} />
          </S.InputBtn>
        </S.PasswordCheckBox>

        <S.Warning
          style={{
            visibility: pwDoubleCheck ? 'hidden' : 'visible',
          }}
        >
          ※ 비밀번호가 일치하지 않습니다.
        </S.Warning>
        <S.LoginInputBox>
          <S.InputTitle style={{ margin: '.5rem 0' }}>Nickname</S.InputTitle>
          <S.MoreInfo>
            특수문자를 제외한 9글자 미만의 닉네임을 설정해 주세요.
          </S.MoreInfo>
          <S.LoginInput
            tabIndex={4}
            type="text"
            name="nickname"
            value={state.nickname}
            onChange={(e) => onChange(e)}
          />
        </S.LoginInputBox>
        <S.Warning
          style={{
            display: nicknameCheck ? 'none' : 'block',
          }}
        >
          ※ 닉네임이 너무 길어요.
        </S.Warning>
        <S.Warning
          style={{
            display: nicknameCheck ? 'block' : 'none',
            visibility: !!state.nickname ? 'visible' : 'hidden',
            color: nicknameDupCheck ? 'lightgreen' : 'red',
          }}
        >
          {nicknameDupCheck
            ? '사용가능한 닉네임입니다.'
            : '중복된 닉네임입니다.'}
        </S.Warning>
      </S.RegisterInputContainer>
      <S.LoginBtnConatiner>
        <S.LoginBtn
          tabIndex={5}
          onClick={() => {
            emailSignup();
          }}
        >
          Sign Up
        </S.LoginBtn>
      </S.LoginBtnConatiner>
    </>
  );
};

export default RegisterTab;
