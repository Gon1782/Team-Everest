import styled from 'styled-components';

export const LoginContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  overflow-y: hidden;
`;
export const LoginBox = styled.section`
  position: relative;
  width: 440px;
  height: 635px;
  border-radius: 30px;
  background-color: #edf2ff;
  z-index: 1;
`;
export const LoginHeader = styled.header`
  display: flex;
  padding: 1.5rem 2rem;
  gap: 2rem;
`;
export const LoginHeaderBtn = styled.button`
  background-color: #edf2ff;
  border: none;
  font-size: 24px;
  color: #8a9ac3;
`;
