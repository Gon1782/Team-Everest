import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { areaSelector, modalSelector } from '@/common/utils/selector';
import useAddReview from '@/hooks/useAddReview';
import useInput from '@/hooks/useInput';
import useEditReview from '@/hooks/useEditReview';
import useImageInputs from '@/hooks/useImageInputs';
import { EachReview } from '@/types/DetailType';
import ReviewStars from './ReviewStars';
import ReviewForm from './ReviewForm';
import * as S from './style/ReviewStyled';

interface Props {
  type: string;
  areaCode?: string;
  sigunguCode?: string;
  id?: string;
  title: string;
  addr: string;
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  review?: EachReview;
}

const ReviewModal = ({
  type,
  title,
  addr,
  id,
  closeModal,
  closeModalIfClickOutside,
  review,
  areaCode,
  sigunguCode,
}: Props) => {
  // 수정 전 값들 불러오기
  const areacode = !!areaCode ? areaCode : '';
  const sigungucode = !!sigunguCode ? sigunguCode : '';
  const contentId = !!id ? id : '';
  const reviewId = !!review?.id ? review.id : '';
  const reviewContent = !!review?.content ? review.content : '';
  const reviewImg = !!review?.image ? review.image : [];
  const reviewRating = !!review?.rating ? review.rating : 0;

  const [area, sigungu] = areaSelector(areacode, sigungucode);

  const chosen = modalSelector(type, reviewContent, reviewImg, reviewRating);

  // 별점 관련
  const [rating, setRating] = useState(chosen.rating);

  // 인풋
  const [content, onChangeContent, resetContent] = useInput(chosen.content);
  const [image, onChangeImage, resetImage] = useImageInputs(chosen.image);

  // 리셋
  const reset = () => {
    setRating(0);
    resetContent();
    resetImage();
  };

  const addReview = useAddReview(
    area,
    sigungu,
    content,
    rating,
    image,
    contentId,
    reset,
    closeModal,
  );

  const editReview = useEditReview(
    reviewId,
    rating,
    content,
    image,
    reset,
    closeModal,
  );

  return (
    <S.ModalContainer onClick={(e) => closeModalIfClickOutside(e)}>
      <S.ModalBox
        width="790px"
        height="800px"
        gap="0"
        onSubmit={type === 'post' ? (e) => addReview(e) : (e) => editReview(e)}
      >
        <S.ModalHeader>
          <S.ReviewName>
            <span>{title}</span>
            <S.ReviewAddr>{addr}</S.ReviewAddr>
          </S.ReviewName>
          <S.CloseBtn
            onClick={() => {
              reset();
              closeModal();
            }}
          >
            <AiOutlineClose size={24} />
          </S.CloseBtn>
        </S.ModalHeader>
        <ReviewStars
          rating={rating}
          setRating={setRating}
          click={chosen.clicked}
        />
        <S.ReviewModalTitle>리뷰를 남겨주세요</S.ReviewModalTitle>
        <ReviewForm
          content={content}
          image={image}
          onChangeContent={onChangeContent}
          onChangeImage={onChangeImage}
        />
        <S.ReviewModalBtnBox>
          <S.ReviewBtn>등록하기</S.ReviewBtn>
        </S.ReviewModalBtnBox>
      </S.ModalBox>
    </S.ModalContainer>
  );
};

export default ReviewModal;
