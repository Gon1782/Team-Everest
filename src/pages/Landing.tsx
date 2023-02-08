import styled from 'styled-components';

const Landing = () => {
  console.log(process.env.FIREBASE_API_KEY);

  return <StyleTest>Landing 페이지</StyleTest>;
};

const StyleTest = styled.div`
  color: red;
`;

export default Landing;
