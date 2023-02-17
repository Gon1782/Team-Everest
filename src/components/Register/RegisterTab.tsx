import { useState, useEffect } from 'react';
import { getAllUser } from '@/common/api/userApi';
import { registerForm } from '@/common/utils/forms';
import { registerValidation } from '@/common/utils/validations';
import useInputs from '@/hooks/useInputs';
import useSignUp from '@/hooks/useSignUp';
import { Document } from '@/types/DetailType';
import { UserData } from '@/types/UserType';
import RegisterInput from './RegisterInput';
import RegiPasswordInput from './RegiPasswordInput';
import * as S from '../Login/style/LoginTabStyled';

const RegisterTab = () => {
  // GET UserDB
  const [userDB, setUserDB] = useState<Document>();

  const getUser = async () => {
    const data = await getAllUser();
    setUserDB(data);
  };

  // inputs
  const [register, onChange, reset] = useInputs(registerForm);

  // 유효성 검사
  const emailDupCheck = !userDB?.filter(
    (x: UserData) => x.email === register.email,
  ).length;
  const nicknameDupCheck = !userDB?.filter(
    (x: UserData) => x.displayName === register.nickname,
  ).length;
  const [emailCheck, pwCheck, pwDoubleCheck, nicknameCheck, valiDate] =
    registerValidation(register, emailDupCheck, nicknameDupCheck);

  // 회원가입
  const signUp = useSignUp(
    register.email,
    register.password,
    register.nickname,
    reset,
  );

  const emailSignup = () => {
    const validation = valiDate();
    if (validation) {
      signUp();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <S.RegisterInputContainer>
        <RegisterInput
          name={'email'}
          value={register.email}
          onChange={onChange}
          check={emailCheck}
          dupCheck={emailDupCheck}
        />
        <RegiPasswordInput
          password={register.password}
          checkPassword={register.checkPassword}
          pwCheck={pwCheck}
          pwDoubleCheck={pwDoubleCheck}
          onChange={onChange}
        />
        <RegisterInput
          name={'nickname'}
          value={register.nickname}
          onChange={onChange}
          check={nicknameCheck}
          dupCheck={nicknameDupCheck}
        />
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
