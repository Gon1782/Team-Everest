import useDeleteReview from '@/hooks/useDeleteReview';
import * as S from './style/ReviewStyled';

interface Props {
  id: string;
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

const CheckDelete = ({ id, closeModal, closeModalIfClickOutside }: Props) => {
  // 삭제
  const deleteReview = useDeleteReview(id, closeModal);

  return (
    <S.ModalContainer onClick={(e) => closeModalIfClickOutside(e)}>
      <S.ModalBox width="600px" height="300px" jc="space-evenly" ai="center">
        <S.DeleteTitle>정말로 삭제하시겠습니까?</S.DeleteTitle>
        <S.DeleteBtnBox>
          <S.DeleteBtn color="lightgray" onClick={() => closeModal()}>
            취소
          </S.DeleteBtn>
          <S.DeleteBtn color="red" onClick={() => deleteReview()}>
            삭제
          </S.DeleteBtn>
        </S.DeleteBtnBox>
      </S.ModalBox>
    </S.ModalContainer>
  );
};

export default CheckDelete;
