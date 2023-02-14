import { useCallback, useEffect, useState } from 'react';
import { RiBallPenFill, RiCheckboxFill } from 'react-icons/ri';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/common/api/firebase';
import { Document } from '@/types/DetailType';
import useInputs from '@/hooks/useInputs';
import useImageInput from '@/hooks/useImageInput';
import * as S from './style/ProfileStyled';

interface Props {
  user: Document;
  getUserDB: () => Promise<void>;
}

const Profile = ({ user, getUserDB }: Props) => {
  const [profileImg, changeProfileImg, resetImg] = useImageInput('');
  const [img, setImage] = useState(user?.photoURL);
  const [edit, setEdit] = useState(false);
  const form = {
    nickname: user?.displayName,
    intro: user?.introduce,
  };
  const [myInfo, onChangeMyInfo, resetMyInfo] = useInputs(form);

  const updateProfile = useCallback(async () => {
    try {
      await updateDoc(doc(db, 'users', `${user?.uid}`), {
        displayName: myInfo.nickname,
        introduce: myInfo.intro,
      });
      getUserDB();
      resetMyInfo();
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  }, [myInfo]);

  const updateProfileImage = useCallback(async () => {
    setImage(profileImg);
    try {
      await updateDoc(doc(db, 'users', `${user?.uid}`), {
        photoURL: profileImg,
      });
      resetImg();
    } catch (error) {
      console.log(error);
    }
  }, [profileImg]);

  const removeImage = useCallback(async () => {
    setImage('');
    try {
      await updateDoc(doc(db, 'users', `${user?.uid}`), {
        photoURL: '',
      });
      resetImg();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!!profileImg) {
      updateProfileImage();
    }
  }, [profileImg]);

  return (
    <S.ProfileSection>
      <S.MyBackImage src={user?.backImage} />
      <S.ProfileBox>
        <S.ProfileImageBox>
          <S.ProfileImage
            src={
              !!img
                ? img
                : require('@/assets/MyPage/defaultProfile.jpg').default
            }
          />
          <S.BtnBox>
            <S.ProfileLabel>
              Change
              <input
                onChange={(e) => changeProfileImg(e)}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
              />
            </S.ProfileLabel>
            <S.ProfileBtn onClick={() => removeImage()}>Delete</S.ProfileBtn>
          </S.BtnBox>
        </S.ProfileImageBox>
        <S.ProfilInfoBox>
          <S.NicknameBox>
            <span style={{ display: edit ? 'none' : 'flex' }}>
              {user?.displayName}
            </span>
            <RiBallPenFill
              size={24}
              onClick={() => setEdit(true)}
              style={{ cursor: 'pointer', display: edit ? 'none' : 'flex' }}
            />
            <S.NickNameInput
              type="text"
              name="nickname"
              defaultValue={user?.displayName}
              style={{ display: edit ? 'flex' : 'none' }}
              onChange={(e) => onChangeMyInfo(e)}
            />
            <RiCheckboxFill
              size={30}
              onClick={() => updateProfile()}
              style={{ cursor: 'pointer', display: edit ? 'flex' : 'none' }}
            />
          </S.NicknameBox>
          <S.MyText style={{ display: edit ? 'none' : 'block' }}>
            {user?.introduce}
          </S.MyText>
          <S.ProfileInput
            type="text"
            name="intro"
            defaultValue={user?.introduce}
            style={{ display: edit ? 'block' : 'none' }}
            onChange={(e) => onChangeMyInfo(e)}
          />
        </S.ProfilInfoBox>
      </S.ProfileBox>
    </S.ProfileSection>
  );
};

export default Profile;
