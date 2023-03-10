import { ModalProps } from '@/types/StyledType';
import styled from 'styled-components';

export const ReviewSection = styled.section`
  width: 100vw;
  max-width: 1470px;
`;

export const ReviewContainer = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
  margin-bottom: 30px;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    border-radius: 6px;
    background: #e6e6e6;
  }
  &::-webkit-scrollbar-thumb {
    background: #313131;
    border-radius: 6px;
  }
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
  width: 80%;
  /* min-height: 275px; */
  padding: 1rem;
  margin: 1rem auto;
  border: 1px solid #bcd7e9;
  border-radius: 30px;
  gap: 1rem;
`;

export const Profile = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

export const ReviewContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const ReviewImage = styled.img`
  width: 10rem;
  height: 6rem;
  object-fit: cover;
`;

export const ReviewSpace = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bold;
  padding-right: 20px;
`;

export const ReviewContent = styled.div`
  min-height: 70px;
  font-size: 18px;
  line-height: 23px;
  word-break: break-all;
`;

export const ReviewImageBox = styled.div`
  display: flex;
  margin: auto 0;
  gap: 1rem;
`;

export const ReviewCreatedAt = styled.span`
  color: #606060;
  font-size: 14px;
`;

export const ReviewNickname = styled.h6`
  cursor: pointer;
  font-weight: 500;
  color: ${(props) => props.theme.black};
  &:hover {
    color: ${(props) => props.theme.darkgrey};
  }
`;

export const ReviewBtnBox = styled.div`
  gap: 1rem;
  & svg {
    cursor: pointer;
  }
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
  background-color: white;
  border-radius: 1rem;
  gap: ${(props) => (!!props.gap ? props.gap : '1rem')};
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: 0 auto;
  padding: 1rem 0 0.5rem;
  border-bottom: 1px solid lightgray;
`;

export const StarBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 10px;
  & svg {
    color: ${(props) => props.theme.dimgrey};
    cursor: pointer;
  }
  & svg:hover {
    color: ${(props) => props.theme.blue};
  }
  .blueStar {
    color: ${(props) => props.theme.blue};
  }
`;

export const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  & svg {
    cursor: pointer;
    left: 0;
    bottom: 0;
  }
`;

export const ReviewPhotoRef = styled.span`
  margin-top: 10px;
  color: ${(props) => props.theme.darkgrey};
  font-size: 14px;
`;

export const ImageInput = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 100px;
  margin: 0 0 1rem;
  padding: 0.3rem 0.8rem;
  gap: 1rem;
  margin-top: 20px;
  & svg {
    cursor: inherit;
  }
`;

export const InputArea = styled.textarea`
  width: 90%;
  height: 120px;
  background-color: ${(props) => props.theme.grey};
  padding: 1rem;
  border: none;
  border-radius: 20px;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  ::placeholder {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
export const ImageInputTxt = styled.p`
  color: ${(props) => props.theme.darkgrey};
`;

export const InputFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 94.5%;
  padding: 0.5rem 0;
  background-color: white;
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 6rem;
  background-color: white;
  margin: 0 auto;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalImageBox = styled.div`
  position: relative;
  width: 10rem;
  height: 6rem;
  margin: 0 1rem 0 0;
  object-fit: cover;
`;
export const RemoveBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  & svg {
    background-color: white;
    border-radius: 50%;
    font-size: 1.25rem;
    color: ${(props) => props.theme.red};
  }
`;
export const ModalImage = styled.img`
  width: 10rem;
  height: 6rem;
  margin: 0 1rem 0 0;
  object-fit: cover;
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

export const ReviewName = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 20px;
  font-weight: 500;
  font-size: 18px;
`;

export const ReviewLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 285px;
  height: 100%;
  gap: 1rem;
  margin: auto;
`;

export const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 1.5rem 0;
`;

export const ReviewModalTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* margin-top: 10px; */
  font-size: 1.375rem;
  font-weight: 600;
`;

export const ReviewModalBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
`;

export const ReviewBtn = styled.button`
  padding: 0.5rem 0.8rem;
  font-size: 14px;
  border-radius: 30px;
  color: white;
  margin-top: 10px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.blue};
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.navy};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ReviewAddr = styled.span`
  color: lightgray;
`;

export const CloseBtn = styled.div`
  cursor: pointer;
`;

export const StarTitle = styled.span`
  font-size: 20px;
`;
export const StarInfo = styled.h4`
  margin-top: 30px;
  font-weight: 500;
`;
export const StarRating = styled.span`
  font-size: 3rem;
`;
export const ReviewTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.8rem;
  color: white;
  background-color: ${(props) => props.theme.blue};
  border-radius: 30px;
`;
export const ReviewTagsBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export const NoReviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 275px;
  margin: auto;
  border-radius: 30px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.mediumgrey};
  font-size: 22px;
  text-align: center;
  line-height: 36px;
`;
