import { useCallback, useEffect, useState } from 'react';
import { RiBallPenFill, RiCheckboxFill } from 'react-icons/ri';
import { updateUserDB } from '@/common/api/userApi';
import useInputs from '@/hooks/useInputs';
import useImageInput from '@/hooks/useImageInput';
import { Document } from '@/types/DetailType';
import * as S from './style/ProfileStyled';

interface Props {
  user: Document;
  LoginCheck: boolean;
  checkMy: boolean;
  getUser: (uid: string) => Promise<void>;
}

const Profile = ({ user, LoginCheck, checkMy, getUser }: Props) => {
  const check = LoginCheck || checkMy;
  // 프로필 이미지
  const [img, setImage] = useState(user?.photoURL);
  const [profileImg, changeProfileImg, resetImg] = useImageInput('');
  // 프로필 닉네임 한줄소개 수정
  const [edit, setEdit] = useState(false);
  const form = {
    nickname: user?.displayName,
    intro: user?.introduce,
  };
  const [myInfo, onChangeMyInfo, resetMyInfo] = useInputs(form);

  // Update UserDB 프로필 이름/소개
  const updateProfile = useCallback(async () => {
    if (!myInfo.nickname) return alert('닉네임을 입력해주세요.');
    if (myInfo.nickname.length > 8)
      return alert('닉네임이 너무 길어요\n닉네임은 9글자 미만까지 가능합니다.');
    if (myInfo.intro.length > 25)
      return alert('한줄 소개는 25자 까지 가능합니다.');
    await updateUserDB(user.uid, {
      displayName: myInfo.nickname,
      introduce: myInfo.intro,
    });
    getUser(user.uid);
    resetMyInfo();
    setEdit(false);
  }, [myInfo]);

  // Update UserDB 프로필 사진
  const updateProfileImage = useCallback(async () => {
    setImage(profileImg);
    await updateUserDB(user.uid, {
      photoURL: profileImg,
    });
    resetImg();
  }, [profileImg]);

  // Update UserDB 프로필 사진 제거
  const removeImage = useCallback(async () => {
    setImage('');
    await updateUserDB(user.uid, {
      photoURL: '',
    });
    resetImg();
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
          <S.BtnBox style={{ visibility: check ? 'visible' : 'hidden' }}>
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
              style={{
                cursor: 'pointer',
                display: edit ? 'none' : 'flex',
                visibility: check ? 'visible' : 'hidden',
              }}
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
            {!!user?.introduce
              ? user.introduce
              : '소개가 없습니다 작성해주세요'}
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
