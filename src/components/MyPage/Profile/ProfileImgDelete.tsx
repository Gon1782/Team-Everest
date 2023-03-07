import * as S from './style/ProfileStyled';

interface Props {
  name: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setBackImage: React.Dispatch<React.SetStateAction<string>>;
  updateImage: (
    img: string,
    edit: {
      [key: string]: string;
    },
    setImg: React.Dispatch<React.SetStateAction<string>>,
  ) => Promise<void>;
  closeDeleteModal: () => void;
  closeDeleteModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}
const ProfileImgDelete = ({
  name,
  setImage,
  setBackImage,
  updateImage,
  closeDeleteModal,
  closeDeleteModalIfClickOutside,
}: Props) => {
  const deleteImage = () => {
    closeDeleteModal();
    if (name === 'profile') return updateImage('', { photoURL: '' }, setImage);
    else return updateImage('', { backImage: '' }, setBackImage);
  };

  return (
    <S.ModalContainer onClick={(e) => closeDeleteModalIfClickOutside(e)}>
      <S.ModalBox width="600px" height="300px" jc="space-evenly" ai="center">
        <S.DeleteTitle>정말로 삭제하시겠습니까?</S.DeleteTitle>
        <S.DeleteBtnBox>
          <S.DeleteBtn>취소</S.DeleteBtn>
          <S.DeleteBtn color="red" onClick={() => deleteImage()}>
            삭제
          </S.DeleteBtn>
        </S.DeleteBtnBox>
      </S.ModalBox>
    </S.ModalContainer>
  );
};

export default ProfileImgDelete;
