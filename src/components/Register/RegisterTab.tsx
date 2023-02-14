import styled from 'styled-components';
import { AiFillEye, AiOutlineCheck } from 'react-icons/ai';

const RegisterTab = () => {
  // 회원가입 기능 구현 해야함 귀찮아서 나중에
  return (
    <>
      <LoginInputContainer>
        <LoginInputBox>
          <div style={{ fontSize: 24 }}>E-Mail</div>
          <LoginInput name="e-mail" />
          <InputBtn>
            <AiOutlineCheck size={22} />
          </InputBtn>
        </LoginInputBox>
        <LoginInputBox>
          <div style={{ fontSize: 24 }}>Password</div>
          <LoginInput name="password" />
          <InputBtn>
            <AiFillEye size={22} />
          </InputBtn>
        </LoginInputBox>
        <PasswordCheckBox>
          <PasswordCheckInput name="checkPassword" />
          <InputBtn>
            <AiFillEye size={22} />
          </InputBtn>
        </PasswordCheckBox>
        <LoginInputBox>
          <div style={{ fontSize: 24 }}>Nickname</div>
          <LoginInput name="nickname" />
          <InputBtn>
            <AiOutlineCheck size={22} />
          </InputBtn>
        </LoginInputBox>
      </LoginInputContainer>
      <LoginBtnConatiner>
        <LoginBtn>Sign Up</LoginBtn>
      </LoginBtnConatiner>
    </>
  );
};

export default RegisterTab;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
`;

const LoginInputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 1rem auto;
`;

const PasswordCheckBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto 1rem;
`;

const LoginInput = styled.input`
  height: 1.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-bottom: 1px solid black;
  font-size: 22px;
`;
const PasswordCheckInput = styled.input`
  height: 1.5rem;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid black;
  font-size: 22px;
`;
const InputBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0.5rem;
  border: none;
  background-color: lightgray;
  border-radius: 50%;
  font-size: 22px;
`;
const LoginBtnConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;
const LoginBtn = styled.button`
  cursor: pointer;
  width: 85%;
  height: 50px;
  font-size: 22px;
  border: none;
`;
