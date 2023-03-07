import styled from 'styled-components';

export const ProfileSection = styled.section`
  position: relative;
  width: 100%;
  height: 675px;
`;
export const MyBackImage = styled.img`
  position: absolute;
  width: 100%;
  height: 270px;
  background-color: gray;
  border: none;
  object-fit: cover;
`;
export const BackBtnBox = styled.label`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 90%;
  margin-top: 50px;
`;
export const BackChangeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 177px;
  height: 55px;
  color: white;
  background-color: #9db9ff;
  border-radius: 30px;
  margin-top: 25px;
`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 1344px;
  height: 100%;
  margin: auto;
`;
export const ProfileImageBox = styled.div`
  width: 350px;
  height: 400px;
`;
export const ProfileImage = styled.img`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 100%;
  background-color: blue;
  z-index: 1;
`;
export const BtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 50px;
  gap: 1rem;
`;
export const ProfileLabel = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  color: #79808f;
  background-color: transparent;
  font-size: 15px;
`;
export const ProfileBtn = styled.button`
  cursor: pointer;
  color: #79808f;
  background-color: transparent;
  border: none;
  width: 50%;
  font-size: 15px;
  padding: 0;
`;
export const ProfilInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 194px;
  font-size: 1.5rem;
`;
export const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2rem;
  gap: 1rem;
  line-height: 1.5rem;
  padding: 1rem 2rem;
  & svg {
    cursor: pointer;
  }
`;
export const MyText = styled.span`
  width: 100%;
  line-height: 1.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
`;
export const NickNameInput = styled.input`
  position: relative;
  right: 1rem;
  width: 100%;
  height: 2rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  border-bottom: 1px solid black;
`;
export const ProfileInput = styled.input`
  width: 40.7%;
  height: 2rem;
  padding: 0.5rem;
  margin: 0.8rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-bottom: 1px solid black;
`;
