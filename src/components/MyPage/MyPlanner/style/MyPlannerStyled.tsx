import styled from 'styled-components';

export const MyPlannerSection = styled.section`
  max-width: 1344px;
  margin: 3rem auto 0;
  padding: 0 0 1rem;
  border-radius: 20px;
`;

export const MyPlannerTitle = styled.header`
  width: 100%;
  padding: 2rem;
  font-size: 2rem;
`;

export const MyPlannerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  gap: 2rem;
  overflow-x: scroll;
`;

export const MyPlannerBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  min-width: 300px;
  min-height: 300px;
  background-color: lightgray;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const MyPlannerNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 332px;
`;
