// 정규식
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// 파이어베이스 로그인 유효성 검사
export const firebaseLoginValidation = (error) => {
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