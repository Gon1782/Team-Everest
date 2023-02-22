import { useCallback, useEffect, useState } from 'react';
import { RiBallPenFill, RiCheckboxFill } from 'react-icons/ri';
import { updateUserDB } from '@/common/api/userApi';
import useInputs from '@/hooks/useInputs';
import useDefault from '@/hooks/useDefault';
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
  // 마이페이지 수정가능 여부 확인
  const check = LoginCheck || checkMy;

  // 프로필 이미지
  const [img, setImage] = useState(user.photoURL);
  const [profileImg, changeProfileImg, resetImg] = useImageInput('');

  // 프로필 닉네임 한줄소개 수정
  const [checkEdit, setEdit] = useState(false);
  const [myInfo, onChangeMyInfo, resetMyInfo] = useInputs({
    nickname: user.displayName,
    intro: user.introduce,
  });

  // Update UserDB 프로필 이름/소개
  const updateProfile = useCallback(async () => {
    if (!myInfo.nickname) return alert('닉네임을 입력해주세요.');
    if (myInfo.nickname.length > 8)
      return alert('닉네임이 너무 길어요\n닉네임은 9글자 미만까지 가능합니다.');
    if (!!myInfo.intro && myInfo.intro.length > 25)
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
  const updateProfileImage = useCallback(async (img: string) => {
    setImage(img);
    await updateUserDB(user.uid, {
      photoURL: img,
    });
    resetImg();
  }, []);

  useEffect(() => {
    if (!!profileImg) {
      updateProfileImage(profileImg);
    }
  }, [profileImg]);

  const defaults = useDefault();
  const { defaultProfile, defaultIntro, backImage } = defaults();

  // 프로필 사진
  const profileImage = !!img ? img : defaultProfile;

  // 배경사진
  const backgroundImage = !!user.backImage ? user.backImage : backImage;

  // 한줄 소개
  const introduce = !!user.introduce ? user.introduce : defaultIntro;

  return (
    <S.ProfileSection>
      <S.MyBackImage src={backgroundImage} />
      <S.ProfileBox>
        <S.ProfileImageBox>
          <S.ProfileImage src={profileImage} />
          <S.BtnBox style={{ visibility: check ? 'visible' : 'hidden' }}>
            <S.ProfileLabel>
              Change
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => changeProfileImg(e)}
              />
            </S.ProfileLabel>
            <S.ProfileBtn onClick={() => updateProfileImage('')}>
              Delete
            </S.ProfileBtn>
          </S.BtnBox>
        </S.ProfileImageBox>
        <S.ProfilInfoBox>
          <S.NicknameBox>
            <span style={{ display: checkEdit ? 'none' : 'flex' }}>
              {user.displayName}
            </span>
            <RiBallPenFill
              size={24}
              onClick={() => setEdit(true)}
              style={{
                display: checkEdit ? 'none' : 'flex',
                visibility: check ? 'visible' : 'hidden',
              }}
            />
            <S.NickNameInput
              type="text"
              name="nickname"
              defaultValue={user.displayName}
              style={{ display: checkEdit ? 'flex' : 'none' }}
              onChange={(e) => onChangeMyInfo(e)}
            />
            <RiCheckboxFill
              size={30}
              onClick={() => updateProfile()}
              style={{ display: checkEdit ? 'flex' : 'none' }}
            />
          </S.NicknameBox>
          <S.MyText style={{ display: checkEdit ? 'none' : 'block' }}>
            {introduce}
          </S.MyText>
          <S.ProfileInput
            type="text"
            name="intro"
            defaultValue={user.introduce}
            style={{ display: checkEdit ? 'block' : 'none' }}
            onChange={(e) => onChangeMyInfo(e)}
          />
        </S.ProfilInfoBox>
      </S.ProfileBox>
    </S.ProfileSection>
  );
};

export default Profile;
