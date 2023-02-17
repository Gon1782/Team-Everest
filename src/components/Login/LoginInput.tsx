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

  const lists = [
    {
      type: 'text',
      name: 'email',
      title: 'E-Mail',
      warning: '※ 이메일 형식에 맞게 입력해주세요.',
      button: <S.InputBtn onClick={() => reset()}>X</S.InputBtn>,
    },
    {
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
    },
  ];
  const list = lists.filter((x) => x.name === name)[0];

  return (
    <>
      <S.LoginInputBox>
        <S.LoginTitle>{list.title}</S.LoginTitle>
        <S.LoginInput
          tabIndex={1}
          type={list.type}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {list.button}
      </S.LoginInputBox>
      <S.Warning
        style={{
          visibility: check ? 'hidden' : 'visible',
        }}
      >
        {list.warning}
      </S.Warning>
    </>
  );
};

export default LoginInput;
