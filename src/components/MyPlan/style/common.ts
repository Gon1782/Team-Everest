import styled from 'styled-components';

export const PlanBtn = styled.button<{
  backgroundColor?: string;
  color?: string;
}>`
  width: 80px;
  height: 28px;
  font-size: 0.75rem;
  /* background-color: #3f46ff;
  color: #f3f3f3; */
  background-color: #dbe2ef; //${(props) => props.color};
  color: black; //${(props) => props.color};
  border-radius: 50px;
`;
