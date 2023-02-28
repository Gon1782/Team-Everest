import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import LoginTab from '@/components/Login/LoginTab';
import RegisterTab from '@/components/Register/RegisterTab';
import { LoginState } from '@/recoil/atom/Login';
import * as S from './style/LoginStyled';

const Login = () => {
  const navigate = useNavigate();
  // uid
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 로그인, 회원가입 탭 전환
  const [checkLogin, setCheck] = useRecoilState(LoginState);

  const toggleCheck = () => {
    setCheck(!checkLogin);
  };

  useEffect(() => {
    if (!!uid) navigate(-1);
  }, []);

  return (
    <>
      <S.LoginContainer>
        <S.LoginBox>
          <S.LoginHeader>
            <S.LoginHeaderBtn
              style={
                checkLogin
                  ? {
                      color: '#0034B9',
                      borderBottom: '3px solid #0034B9',
                    }
                  : { cursor: 'pointer' }
              }
              onClick={() => toggleCheck()}
              disabled={checkLogin ? true : false}
            >
              Log in
            </S.LoginHeaderBtn>
            <S.LoginHeaderBtn
              style={
                !checkLogin
                  ? {
                      color: '#0034B9',
                      borderBottom: '3px solid #0034B9',
                    }
                  : { cursor: 'pointer' }
              }
              onClick={() => toggleCheck()}
              disabled={checkLogin ? false : true}
            >
              Register
            </S.LoginHeaderBtn>
          </S.LoginHeader>
          {checkLogin ? <LoginTab /> : <RegisterTab />}
        </S.LoginBox>
      </S.LoginContainer>
    </>
  );
};

export default Login;
