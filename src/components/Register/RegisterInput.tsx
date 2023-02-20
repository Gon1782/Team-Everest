import * as S from '../Login/style/LoginTabStyled';

interface Props {
  name: string;
  value: string;
  check: boolean | RegExpMatchArray | null;
  dupCheck: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const RegisterInput = ({ name, value, check, dupCheck, onChange }: Props) => {
  const selector = (name: string) => {
    switch (true) {
      case name === 'email':
        return {
          title: 'E-Mail',
          info: '영문, 숫자로 이루어진 이메일을 입력해주세요.',
          warning: '※ 이메일 형식에 맞게 입력해주세요.',
          checkUse: dupCheck
            ? '사용가능한 이메일입니다.'
            : '중복된 이메일입니다.',
        };
      case name === 'nickname':
        return {
          title: 'Nickname',
          info: '특수문자를 제외한 9글자 미만의 닉네임을 설정해 주세요.',
          warning: '※ 닉네임이 너무 길어요.',
          checkUse: dupCheck
            ? '사용가능한 닉네임입니다.'
            : '중복된 닉네임입니다.',
        };
      default:
        return {
          title: '',
          info: '',
          warning: '',
          checkUse: '',
        };
    }
  };
  const chosen = selector(name);

  return (
    <>
      <S.LoginInputBox>
        <S.RegisterTitle>{chosen.title}</S.RegisterTitle>
        <S.MoreInfo>{chosen.info}</S.MoreInfo>
        <S.LoginInput
          tabIndex={1}
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {/* 이메일 인증인데 추가할지 말지 모름 */}
        {/* <InputBtn>
            <AiOutlineCheck size={22} />
          </InputBtn> */}
      </S.LoginInputBox>
      <S.Warning
        style={{
          display: check ? 'none' : 'block',
        }}
      >
        {chosen.warning}
      </S.Warning>
      <S.Warning
        style={{
          display: check ? 'block' : 'none',
          visibility: !!value ? 'visible' : 'hidden',
          color: dupCheck ? 'lightgreen' : 'red',
        }}
      >
        {dupCheck ? '사용가능한 이메일입니다.' : '중복된 이메일입니다.'}
      </S.Warning>
    </>
  );
};

export default RegisterInput;
