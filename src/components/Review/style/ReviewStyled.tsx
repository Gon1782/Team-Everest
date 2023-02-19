import { ModalProps } from '@/types/StyledType';
import styled from 'styled-components';

export const ReviewSection = styled.section`
  width: 100%;
`;

export const ReviewContainer = styled.div`
  width: 100%;
`;

export const LoadMoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const LoadMore = styled.button`
  width: 10rem;
  height: 5rem;
  margin: auto;
`;

export const Review = styled.div`
  display: flex;
  width: 90%;
  gap: 1rem;
  margin: 1rem auto;
`;

export const Profile = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const ReviewImage = styled.img`
  width: 10rem;
  height: 6rem;
`;

export const ReviewSpace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
`;

export const ReviewNickname = styled.span`
  cursor: pointer;
`;

export const ReviewBtnBox = styled.div`
  gap: 1rem;
`;

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  background-color: rgba(0 0 0/60%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalBox = styled.form<ModalProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: black;
  background-color: gray;
  border-radius: 1rem;
  gap: ${(props) => (!!props.gap ? props.gap : '1rem')};
`;

export const ModalHeader = styled.header`
  display: grid;
  grid-template-columns: 100px 400px 100px;
  justify-items: center;
  align-items: center;
  padding: 3rem 0 1rem;
`;

export const StarBox = styled.span`
  display: flex;
  justify-content: center;
  & svg {
    color: black;
    cursor: pointer;
  }
  & svg:hover {
    color: yellow;
  }
  .yellowStar {
    color: yellow;
  }
`;

export const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 90%;
  height: 50%;
  margin: 1rem auto 0;
  & svg {
    cursor: pointer;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;

export const InputArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  resize: none;
`;

export const InputFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  height: 5%;
  margin: 0 auto;
  background-color: white;
  border-top: 1px solid black;
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 15%;
  background-color: white;
  margin: 0 auto;
  border-top: 1px solid black;
  overflow-x: scroll;
`;

export const ModalImage = styled.img`
  width: 10rem;
  height: 6rem;
  margin: 0 1rem;
`;

export const DeleteTitle = styled.h2`
  font-size: 1.5rem;
`;

export const DeleteBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

export const DeleteBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 3rem;
  border-radius: 30px;
  background-color: ${(props) => props.color};
`;
