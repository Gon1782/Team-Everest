import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import * as S from './style/LoginTabStyled';

interface Props {
  name: string;
  value: string;
  check: boolean | RegExpMatchArray | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  reset: () => void;
}

const LoginInput = ({ name, value, check, onChange, reset }: Props) => {
  const [visible, setVisible] = useState(false);

  const selector = (name: string) => {
    switch (true) {
      case name === 'email':
        return {
          type: 'text',
          name: 'email',
          title: 'E-Mail',
          warning: '※ 이메일 형식에 맞게 입력해주세요.',
          button: <S.InputBtn onClick={() => reset()}>X</S.InputBtn>,
        };
      case name === 'password':
        return {
          type: visible ? 'text' : 'password',
          name: 'password',
          title: 'Password',
          warning: '※ 비밀번호를 확인해주세요',
          button: (
            <>
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
            </>
          ),
        };
      default:
        return {
          type: '',
          name: '',
          title: '',
          warning: '',
          button: <div></div>,
        };
    }
  };

  const chosen = selector(name);

  return (
    <>
      <S.LoginInputBox>
        <S.LoginTitle>{chosen.title}</S.LoginTitle>
        <S.LoginInput
          tabIndex={1}
          type={chosen.type}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {chosen.button}
      </S.LoginInputBox>
      <S.Warning
        style={{
          visibility: check ? 'hidden' : 'visible',
        }}
      >
        {chosen.warning}
      </S.Warning>
    </>
  );
};

export default LoginInput;
