import styled from 'styled-components';

export const ProfileSection = styled.section`
  position: relative;
  width: 100%;
  height: 675px;
`;
export const MyBackImage = styled.img`
  position: absolute;
  width: 100%;
  height: 450px;
  background-color: green;
  border: none;
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
  width: 350px;
  height: 350px;
  border-radius: 20px;
  background-color: blue;
  z-index: 1;
`;
export const BtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 50px;
`;
export const ProfileLabel = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  color: black;
  background-color: transparent;
  font-size: 1.5rem;
`;
export const ProfileBtn = styled.button`
  cursor: pointer;
  color: black;
  background-color: transparent;
  border: none;
  width: 50%;
  font-size: 1.5rem;
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
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 2rem;
  gap: 3rem;
  line-height: 1.5rem;
  padding: 1rem 2rem;
`;
export const MyText = styled.span`
  width: 100%;
  line-height: 1.5rem;
  padding: 1rem 2rem;
`;
export const NickNameInput = styled.input`
  position: relative;
  right: 1rem;
  width: 100%;
  height: 2rem;
  padding: 0 0.5rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  border-radius: 20px;
  border: none;
`;
export const ProfileInput = styled.input`
  width: 40.7%;
  height: 2rem;
  padding: 0 0.5rem;
  margin: 0.8rem 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  border-radius: 20px;
  border: none;
`;
