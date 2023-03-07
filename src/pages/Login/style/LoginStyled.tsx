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
  background-color: #f9f7f7;
  z-index: 1;
  padding: 1rem;
`;
export const LoginHeader = styled.header`
  display: flex;
  /* gap: 2rem; */
  padding: 1rem;
  width: 100%;
`;
export const LoginHeaderBtn = styled.button`
  width: 100%;
  border: none;
  font-size: 1.25rem;
  background-color: transparent;
  border-bottom: 2px solid #bfbfbf;
  padding-bottom: 10px;
`;
