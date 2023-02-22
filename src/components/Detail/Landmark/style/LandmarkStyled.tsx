import styled from 'styled-components';

export const LandmarkContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 70vh;
  padding: 0 0 3rem;
  gap: 1rem;
  color: white;
`;
export const LandmarkBox = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #737373;
`;
export const SeeMore = styled.div`
  cursor: pointer;
  grid-column: 3/4;
  grid-row: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #737373;
  font-size: 3rem;
`;
export const LandmarkImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
`;
export const LandmarkInfo = styled.div`
  position: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  font-size: 1.5rem;
`;
export const LandmarkBookmarkBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
export const LandmarkBookmarkBack = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  background-color: #737373;
  border-radius: 50%;
  & svg {
    cursor: pointer;
  }
`;
export const LandmarkTitle = styled.h1`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  background-color: #737373;
  border-radius: 0 0 30px 30px;
`;
