import { ModalProps } from '@/types/StyledType';
import styled from 'styled-components';
import { RiBallPenFill, RiCheckboxFill } from 'react-icons/ri';

export const ProfileSection = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 458px;
`;
export const MyBackImage = styled.img`
  position: absolute;
  width: 100%;
  height: 300px;
  background-color: gray;
  border: none;
  object-fit: cover;
`;
export const BackBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 158px;
`;
export const BackBtnCamera = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  font-size: 16px;
  color: ${(props) => props.theme.darkgrey};
  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;
export const BackBtnDelete = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  font-size: 16px;
  color: ${(props) => props.theme.darkgrey};
  margin: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  margin: auto;
`;
export const ProfileImageBox = styled.div`
  width: 227px;
  height: 277px;
  border: 1px solid lightgray;
  border-radius: 20px;
`;
export const ProfileImage = styled.img`
  position: relative;
  width: 225px;
  height: 225px;
  border-radius: 20px 20px 0 0;
  z-index: 1;
`;
export const ProfileBtnBox = styled.div`
  width: 90%;
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8rem;
  margin: auto;
`;
export const ProfileLabel = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 15px;
  color: ${(props) => props.theme.darkgrey};
  width: 30px;
  height: 30px;
  border-radius: 100px;
  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;
export const ProfileBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: ${(props) => props.theme.darkgrey};
  width: 30px;
  height: 30px;
  border-radius: 100px;
  padding: 0;
  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;
export const ProfilInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 532px;
  height: 194px;
  font-size: 35px;
`;
export const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  margin-bottom: 1rem;
  gap: 1rem;
  & svg {
    cursor: pointer;
  }
`;
export const Nickname = styled.div`
  font-size: 2rem;
`;
export const EditIconLabel = styled.label`
  cursor: pointer;
  margin-top: 5px;
  width: 35px;
  height: 35px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;
export const EditIcon = styled(RiBallPenFill)`
  font-size: 22px;
  color: ${(props) => props.theme.blue};
`;
export const MyText = styled.span`
  font-size: 20px;
  margin: 0 1rem;
`;
export const NickNameInput = styled.input`
  width: 140px;
  font-size: 35px;
  border-bottom: 1px solid black;
`;
export const ProfileInput = styled.input`
  height: 2rem;
  margin: 0 1rem;
  font-size: 20px;
  border-bottom: 1px solid black;
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
