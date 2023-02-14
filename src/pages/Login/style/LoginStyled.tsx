import styled from 'styled-components';

export const LoginContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
  overflow-y: hidden;
`;
export const LoginBox = styled.section`
  width: 440px;
  height: 635px;
  background-color: white;
`;
export const LoginHeader = styled.header`
  display: flex;
  padding: 1.5rem 2rem;
  gap: 2rem;
`;
export const LoginHeaderBtn = styled.button`
  background-color: white;
  border: none;
  font-size: 24px;
  color: lightgray;
`;
