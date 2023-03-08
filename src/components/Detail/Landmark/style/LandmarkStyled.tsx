import styled from 'styled-components';

export const LandmarkContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 60%;
  height: 70vh;
  padding: 0 0 3rem;
  margin: 0 auto;
  gap: 2rem;
  color: white;
  margin-bottom: 64px;
`;
export const LandmarkBox = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #737373;
  box-shadow: 13px 14px 20px -17px rgba(0, 0, 0, 0.2);
`;
export const SeeMore = styled.div`
  cursor: pointer;
  grid-column: 3/4;
  grid-row: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #737373;
  font-size: 3rem;
`;
export const LandmarkImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
`;
export const LandmarkInfo = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  z-index: 1;
  font-size: 1.5rem;
`;
export const LandmarkBookmarkBox = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
`;
export const LandmarkBookmarkBack = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  /* background-color: ${(props) => props.theme.dimgrey}; */
  background-color: rgba(216, 210, 203, 0.7);
  border-radius: 50%;
  & svg {
    cursor: pointer;
  }
`;
export const LandmarkTitle = styled.h5`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 18%;
  padding: 0.5rem;
  background-color: rgba(238, 238, 238, 0.7);
  color: ${(props) => props.theme.black};
  border-radius: 0 0 20px 20px;
  word-break: keep-all;
  font-weight: 600;
  text-align: center;
`;
