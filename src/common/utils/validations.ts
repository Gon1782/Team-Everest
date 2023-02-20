import { State } from '@/hooks/useInputs';
import { ErrorData } from '@firebase/util';

// 정규식
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// 로그인 유효성 검사
export const LoginValidation = (email: string, password: string) => {
  const emailCheck = !email || email.match(emailRegex);
  const pwCheck = !password || password.match(pwRegex);

  const valiDate = () => {
    if (!emailCheck) return false;
    if (!pwCheck) return false;
    return true;
  };

  return [emailCheck, pwCheck, valiDate] as const;
};

export const firebaseLoginValidation = (error: ErrorData) => {
  switch (error.message) {
    case 'Firebase: Error (auth/invalid-email).':
      return alert('이메일을 입력해주세요');
    case 'Firebase: Error (auth/internal-error).':
      return alert('비밀번호를 입력해주세요.');
    case 'Firebase: Error (auth/wrong-password).':
      return alert('비밀번호가 일치하지 않습니다.');
    case 'Firebase: Error (auth/user-not-found).':
      return alert(
        '가입된 정보가 없습니다.\n이메일과 패스워드를 확인해주세요.',
      );
    default:
      console.log(error.message);
  }
};

// 회원가입 유효성검사
export const registerValidation = (
  state: State,
  emailDupCheck: boolean,
  nicknameDupCheck: boolean,
) => {
  const emailCheck = !state.email || state.email.match(emailRegex);
  const pwCheck = !state.password || state.password.match(pwRegex);
  const pwDoubleCheck =
    !state.checkPassword || state.password === state.checkPassword;
  const nicknameCheck = state.nickname.length >= 0 && state.nickname.length < 9;

  const valiDate = () => {
    if (!emailCheck) return false;
    if (!pwCheck) return false;
    if (!nicknameCheck) return false;
    if (state.nickname.length > 8) return false;
    if (!emailDupCheck) return false;
    if (!nicknameDupCheck) return false;
    if (!state.email) {
      alert('이메일을 입력해주세요');
      return false;
    }
    if (!state.password) {
      alert('비밀번호를 입력해주세요');
      return false;
    }
    if (!state.checkPassword) {
      alert('비밀번호를 확인해주세요');
      return false;
    }
    if (!state.nickname) {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    return true;
  };
  return [emailCheck, pwCheck, pwDoubleCheck, nicknameCheck, valiDate] as const;
};

export const myPageValidation = (state: State) => {
  switch (true) {
    case !state.nickname:
      alert('닉네임을 입력해주세요');
      return false;
    case state.nickname.length > 8:
      alert('닉네임이 너무 길어요\n닉네임은 9글자 미만까지 가능합니다.');
      return false;
    case state.intro.length > 25:
      alert('한줄 소개는 25자 까지 가능합니다.');
      return false;
    default:
      return true;
  }
};
