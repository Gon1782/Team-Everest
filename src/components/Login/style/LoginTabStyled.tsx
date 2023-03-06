import { ButtonProps, ModalProps } from '@/types/StyledType';
import styled from 'styled-components';

export const LoginTab = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const LoginInputContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginInputBox = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
`;

export const LoginInput = styled.input`
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1rem;
  background-color: #edf2ff;
`;
export const InputBtn = styled.div`
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
  border-radius: 50%;
  font-size: 22px;
`;
export const LoginBtnConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LoginBtn = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 85%;
  height: 40px;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  color: ${(Props) => Props.color};
  background-color: ${(Props) => Props.backColor};
  border: 1px solid rgba(0, 0, 0, 0.2);
  & svg {
    margin-right: 0.5rem;
  }
`;
export const LoginOrBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 80px;
`;
export const LoginLine = styled.span`
  position: absolute;
  display: block;
  width: 85%;
  height: 1px;
  background-color: #707070;
`;
export const LoginOr = styled.div`
  display: flex;
  width: 150px;
  justify-content: center;
  background-color: #edf2ff;
  z-index: 1;
`;
export const RegisterBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: 85%;
  margin: 1rem auto;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  color: rgba(0, 0, 0, 50%);
  &:hover {
    color: black;
  }
`;
export const SocialLoginBtnBox = styled.div`
  cursor: pointer;
  display: flex;
  gap: 2rem;
`;

export const RegisterInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LoginTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 24px;
  color: rgba(0, 0, 0, 50%);
`;
export const RegisterTitle = styled.div`
  margin: 0.5rem 0;
  font-size: 24px;
  color: rgba(0, 0, 0, 50%);
`;

export const MoreInfo = styled.div`
  color: 'gray';
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

export const Warning = styled.div`
  color: red;
  margin: 0.5rem;
`;

export const PasswordCheckBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
`;
export const PasswordCheckInput = styled.input`
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1rem;
  background-color: #edf2ff;
`;

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  background-color: rgba(0 0 0/60%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalBox = styled.div<ModalProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: black;
  background-color: white;
  border-radius: 1rem;
  gap: ${(props) => (!!props.gap ? props.gap : '1rem')};
`;

export const PasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 2rem;
  margin-top: 3rem;
`;

export const EmailInput = styled.input`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 30px;
`;

export const PasswordCheckTitle = styled.h2`
  font-size: 1.5rem;
`;

export const PasswordCheckBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

export const PasswordCheckBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 3rem;
  border-radius: 30px;
  background-color: ${(props) => props.color};
`;
