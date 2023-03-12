import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import * as S from '../Login/style/LoginTabStyled';

interface Props {
  password: string;
  checkPassword: string;
  pwCheck: boolean | RegExpMatchArray | null;
  pwDoubleCheck: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const RegiPasswordInput = ({
  password,
  checkPassword,
  pwCheck,
  pwDoubleCheck,
  onChange,
}: Props) => {
  const [pwVisible, setVisible] = useState(false);
  const [checkPwVisible, setCheckVisible] = useState(false);
  return (
    <>
      <S.LoginInputBox>
        <S.RegisterTitle>Password</S.RegisterTitle>
        <S.MoreInfo>8자 이상의 영문, 숫자, 특수문자를 사용하세요.</S.MoreInfo>
        <S.LoginInput
          tabIndex={2}
          type={pwVisible ? 'text' : 'password'}
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <S.InputBtn
          style={{ display: pwVisible ? 'none' : 'flex' }}
          onClick={() => setVisible(true)}
        >
          <AiFillEye size={20} />
        </S.InputBtn>
        <S.InputBtn
          style={{ display: pwVisible ? 'flex' : 'none' }}
          onClick={() => setVisible(false)}
        >
          <AiFillEyeInvisible size={20} />
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
          value={checkPassword}
          onChange={(e) => onChange(e)}
        />
        <S.InputBtn
          style={{ display: checkPwVisible ? 'none' : 'flex' }}
          onClick={() => setCheckVisible(true)}
        >
          <AiFillEye size={20} />
        </S.InputBtn>
        <S.InputBtn
          style={{ display: checkPwVisible ? 'flex' : 'none' }}
          onClick={() => setCheckVisible(false)}
        >
          <AiFillEyeInvisible size={20} />
        </S.InputBtn>
      </S.PasswordCheckBox>

      <S.Warning
        style={{
          visibility: pwDoubleCheck ? 'hidden' : 'visible',
        }}
      >
        ※ 비밀번호가 일치하지 않습니다.
      </S.Warning>
    </>
  );
};

export default RegiPasswordInput;
