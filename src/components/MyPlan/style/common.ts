import styled from 'styled-components';

export const PlanBtn = styled.button<{
  backgroundColor?: string;
  color?: string;
}>`
  width: 80px;
  height: 28px;
  font-size: 0.75rem;
  /* background-color: #004A7C;
  color: #f3f3f3; */
  background-color: #f1f6f9; //${(props) => props.color};
  color: gray; //${(props) => props.color};
  border-radius: 50px;
`;
