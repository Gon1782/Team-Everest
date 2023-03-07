import * as S from '../MyPage/Profile/style/ProfileStyled';
const UserInfo = ({
  userInfo,
}: {
  userInfo: { displayName: string; photoURL: string; backImage: string };
}) => {
  return (
    <>
      <MyBackImage src={userInfo.backImage} />
      <ProfileBox>
        <ProfileImageBox>
          <ProfileImage src={userInfo.photoURL} />
        </ProfileImageBox>
        <ProfilInfoBox>
          <p style={{ color: 'white' }}>{userInfo.displayName}</p>
        </ProfilInfoBox>
      </ProfileBox>
    </>
  );
};

export default UserInfo;

import styled from 'styled-components';

const UserInfoSection = styled.div`
  position: relative;
`;
export const ProfileSection = styled.section`
  width: 100%;
  height: 675px;
`;
export const MyBackImage = styled.img`
  width: 100%;
  height: 450px;
  background-color: gray;
  border: none;
  object-fit: cover;
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
