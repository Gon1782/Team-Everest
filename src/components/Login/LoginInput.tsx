import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai';
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
          warning: (
            <S.Warning
              style={{
                visibility: check ? 'hidden' : 'visible',
              }}
            >
              ※ 이메일 형식에 맞게 입력해주세요.
            </S.Warning>
          ),
          button: (
            <S.InputBtn onClick={() => reset()}>
              <AiOutlineClose size={20} />
            </S.InputBtn>
          ),
        };
      case name === 'password':
        return {
          type: visible ? 'text' : 'password',
          name: 'password',
          title: 'Password',
          warning: '',
          button: (
            <>
              <S.InputBtn
                onClick={() => setVisible(true)}
                style={{ display: visible ? 'none' : 'flex' }}
              >
                <AiFillEye size={20} />
              </S.InputBtn>
              <S.InputBtn
                onClick={() => setVisible(false)}
                style={{ display: visible ? 'flex' : 'none' }}
              >
                <AiFillEyeInvisible size={20} />
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
      {chosen.warning}
    </>
  );
};

export default LoginInput;
