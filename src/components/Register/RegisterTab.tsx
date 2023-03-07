import { useState, useEffect, useMemo } from 'react';
import { getAllUser } from '@/common/api/userApi';
import { registerForm } from '@/common/utils/forms';
import { registerValidation } from '@/common/utils/validations';
import useInputs from '@/hooks/useInputs';
import useSignUp from '@/hooks/useSignUp';
import { UserData } from '@/types/UserType';
import RegisterInput from './RegisterInput';
import RegiPasswordInput from './RegiPasswordInput';
import * as S from '../Login/style/LoginTabStyled';
import { usePrompt } from '@/hooks/useConfirmExit';

const RegisterTab = () => {
  const [checkSignUp, setCheckSignUp] = useState(false);

  // GET UserDB
  const [userDB, setUserDB] = useState<UserData[]>();

  const getUser = async () => {
    await getAllUser()
      .then((res) => setUserDB(res))
      .catch((e) => console.log(e.message));
  };

  // inputs
  const [register, onChange, reset] = useInputs(registerForm);

  // 유효성 검사
  const emailDupCheck = !userDB?.filter(
    (user: UserData) => user.email === register.email,
  ).length;
  const nicknameDupCheck = !userDB?.filter(
    (user: UserData) => user.displayName === register.nickname,
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

  const emailSignup = (e: React.FormEvent<HTMLFormElement>) => {
    setCheckSignUp(true);
    e.preventDefault();
    const validation = valiDate();
    if (validation) {
      signUp();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // 페이지 나갈때 체크
  const checkLeave = () => {
    if (checkSignUp) return false;
    else
      return (
        register.email.length > 0 ||
        register.password.length > 0 ||
        register.checkPassword.length > 0 ||
        register.nickname.length > 0
      );
  };

  const message = useMemo(
    () => '정말로 페이지를 나가시겠습니까?\n저장되지 않은 데이터는 사라집니다.',
    [],
  );

  usePrompt(message, checkLeave());

  return (
    <form onSubmit={(e) => emailSignup(e)}>
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
        <S.LoginBtn color="white" backColor="#112D4E">
          Sign Up
        </S.LoginBtn>
      </S.LoginBtnConatiner>
    </form>
  );
};

export default RegisterTab;
