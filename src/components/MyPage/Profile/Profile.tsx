import { useCallback, useEffect, useState } from 'react';
import { RiBallPenFill, RiCheckboxFill } from 'react-icons/ri';
import { updateUserDB } from '@/common/api/userApi';
import useInputs from '@/hooks/useInputs';
import useDefault from '@/hooks/useDefault';
import useImageInput from '@/hooks/useImageInput';
import { UserData } from '@/types/UserType';
import * as S from './style/ProfileStyled';

interface Props {
  user: UserData;
  LoginCheck: boolean;
  checkMy: boolean;
  getUser: (uid: string) => Promise<void>;
}

const Profile = ({ user, LoginCheck, checkMy, getUser }: Props) => {
  // 마이페이지 수정가능 여부 확인
  const check = LoginCheck || checkMy;

  // 프로필 이미지
  const [img, setImage] = useState(user.photoURL);
  const [backImg, setBackImage] = useState(user.backImage);
  const [profileImg, changeProfileImg, resetImg] = useImageInput('');
  const [backImage, changeBackImg, resetBackImg] = useImageInput('');

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

  // Update UserDB 배경 사진
  const updateImage = useCallback(
    async (
      img: string,
      edit: { [key: string]: string },
      setImg: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      setImg(img);
      await updateUserDB(user.uid, edit);
      resetImg();
      resetBackImg();
    },
    [],
  );

  useEffect(() => {
    if (!!backImage) {
      updateImage(backImage, { backImage: backImage }, setBackImage);
    }
  }, [backImage]);

  useEffect(() => {
    if (!!profileImg) {
      updateImage(profileImg, { photoURL: profileImg }, setImage);
    }
  }, [profileImg]);

  const defaults = useDefault();
  const { defaultProfile, defaultIntro, defaultBackImage } = defaults();

  // 프로필 사진
  const profileImage = !!img ? img : defaultProfile;

  // 배경사진
  const backgroundImage = !!backImg ? backImg : defaultBackImage;

  // 한줄 소개
  const introduce = !!user.introduce ? user.introduce : defaultIntro;

  return (
    <S.ProfileSection>
      <S.MyBackImage src={backgroundImage} />
      <S.BackBtnBox>
        <S.BackChangeBtn>이미지 변경하기</S.BackChangeBtn>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => changeBackImg(e)}
        />
      </S.BackBtnBox>
      <S.ProfileBox>
        <S.ProfileImageBox>
          <S.ProfileImage src={profileImage} />
          <S.BtnBox style={{ visibility: check ? 'visible' : 'hidden' }}>
            <S.ProfileLabel>
              이미지 변경하기
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => changeProfileImg(e)}
              />
            </S.ProfileLabel>
            <S.ProfileBtn
              onClick={() => updateImage('', { photoURL: '' }, setImage)}
            >
              이미지 삭제하기
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
