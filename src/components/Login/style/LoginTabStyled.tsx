import styled from 'styled-components';

export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

export const LoginInputBox = styled.div`
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
`;
export const InputBtn = styled.button`
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
export const LoginBtnConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;
export const LoginBtn = styled.button`
  cursor: pointer;
  width: 85%;
  height: 50px;
  font-size: 22px;
  border: none;
`;
export const RegisterBtn = styled.button`
  cursor: pointer;
  font-size: 1rem;
  background-color: transparent;
  border: none;
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

export const InputTitle = styled.div`
  font-size: 24px;
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
`;
