import LoginTab from '@/components/Login/LoginTab';
import RegisterTab from '@/components/Register/RegisterTab';
import { LoginState } from '@/recoil/atom/LoginToggle';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Login = () => {
  const [checkLogin, setCheck] = useRecoilState(LoginState);

  const toggleCheck = () => {
    setCheck(!checkLogin);
  };

  return (
    <>
      <LoginContainer>
        <LoginBox>
          <LoginHeader>
            <LoginHeaderBtn
              style={
                checkLogin
                  ? {
                      color: 'black',
                      borderBottom: '3px solid black',
                    }
                  : { cursor: 'pointer' }
              }
              onClick={() => toggleCheck()}
              disabled={checkLogin ? true : false}
            >
              Log in
            </LoginHeaderBtn>
            <LoginHeaderBtn
              style={
                !checkLogin
                  ? {
                      color: 'black',
                      borderBottom: '3px solid black',
                    }
                  : { cursor: 'pointer' }
              }
              onClick={() => toggleCheck()}
              disabled={checkLogin ? false : true}
            >
              Register
            </LoginHeaderBtn>
          </LoginHeader>
          {checkLogin ? <LoginTab /> : <RegisterTab />}
        </LoginBox>
      </LoginContainer>
    </>
  );
};

export default Login;

const LoginContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
  overflow-y: hidden;
`;
const LoginBox = styled.section`
  width: 440px;
  height: 635px;
  background-color: white;
`;
const LoginHeader = styled.header`
  display: flex;
  padding: 1.5rem 2rem;
  gap: 2rem;
`;
const LoginHeaderBtn = styled.button`
  background-color: white;
  border: none;
  font-size: 24px;
  color: lightgray;
`;
