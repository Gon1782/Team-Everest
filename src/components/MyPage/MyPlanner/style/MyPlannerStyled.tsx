import { VisibleProps } from '@/types/StyledType';
import styled from 'styled-components';

export const MyPlannerSection = styled.section`
  width: 100%;
  margin: 3rem auto 0;
  padding: 0 0 1rem;
  border-radius: 20px;
`;

export const MyPlannerTitle = styled.header`
  width: 100%;
  padding: 2rem 0;
  font-size: 2rem;
`;

export const MyPlannerContainer = styled.div<VisibleProps>`
  display: flex;
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    border-radius: 6px;
    background: #fff;
    visibility: ${(props) => props.visible};
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 6px;
  }
`;

export const MyPlannerBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: lightgray;
  border-radius: 50%;
  margin-bottom: 20px;
  position: 'relative';
`;

export const MyPlannerNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 332px;
`;
