import styled from 'styled-components';

export const MyReviewSection = styled.section`
  width: 100%;
  margin: 3rem auto 0;
  padding: 0 0 1rem;
  border-radius: 20px;
  position: relative;
`;
export const MyReviewHeader = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 80px;
  margin-bottom: 50px;
`;

export const MyReviewTitle = styled.h3`
  width: 100%;
  /* padding: 2rem 0; */
  text-align: center;
`;
export const MyReviewLoadMore = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 40px;
  font-size: 18px;
  color: white;
  background-color: #2871a3;
  border-radius: 30px;
  margin-bottom: 20px;
  position: absolute;
  right: 0;
  top: 0;
`;
export const MyReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  width: 100%;
  row-gap: 2.5rem;
`;
export const MyReviewNone = styled.div`
  grid-column: 1/ 4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 460px;
`;
export const MyReview = styled.div`
  cursor: pointer;
  width: 388px;
  height: 420px;
  background-color: ${(props) => props.theme.grey};
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 13px 14px 25px -17px rgba(0, 0, 0, 0.28);
`;
export const MyReviewInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 2rem;
  gap: 1.5rem;
  margin-top: 2rem;
`;
export const MyReviewInfoTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
`;
export const MyReviewRatingBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  gap: 0.3rem;
`;
export const MyReviewContentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: white;
  width: 100%;
  min-height: 107px;
  padding: 1rem;
  font-size: 1rem;
  word-break: break-all;
  border-radius: 10px;
`;
export const MyImageBox = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0;
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
