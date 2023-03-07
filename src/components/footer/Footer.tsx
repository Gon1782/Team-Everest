import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' ? (
        <Container>
          <Text>copyrights 2023. all rights reserved by Team Everest</Text>
        </Container>
      ) : null}
    </>
  );
};

export default Footer;

const Container = styled.div`
  position: relative;
  transform: translatY(-100%);
  width: 100%;
  height: 80px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 14px;
`;
