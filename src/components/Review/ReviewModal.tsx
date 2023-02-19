import { useCallback, useState } from 'react';
import { FaStar, FaCamera } from 'react-icons/fa';
import useAddReview from '@/hooks/useAddReview';
import useInput from '@/hooks/useInput';
import useEditReview from '@/hooks/useEditReview';
import useImageInputs from '@/hooks/useImageInputs';
import { Document, EachReview } from '@/types/DetailType';
import * as S from './style/ReviewStyled';
import { modalSelector } from '@/common/utils/selector';

interface Props {
  type: string;
  id?: string;
  title: string;
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  user?: Document;
  review?: EachReview;
}

const ReviewModal = ({
  type,
  title,
  id,
  closeModal,
  closeModalIfClickOutside,
  user,
  review,
}: Props) => {
  // 수정 전 값들 불러오기
  const contentId = !!id ? id : '';
  const reviewId = !!review?.id ? review.id : '';
  const reviewContent = !!review?.content ? review.content : '';
  const reviewImg = !!review?.image ? review.image : [];
  const reviewRating = !!review?.rating ? review.rating : 0;

  const chosen = modalSelector(type, reviewContent, reviewImg, reviewRating);

  // 별점 관련
  const [rating, setRating] = useState(chosen.rating);
  const [hovered, setHovered] = useState(0);
  const [clicked, setClicked] = useState(chosen.clicked);
  const ratingArr = [0, 1, 2, 3, 4];

  const handleStarClick = useCallback((index: number) => {
    const clickStates = [...clicked].map((_, i) => (i <= index ? true : false));
    setRating(clickStates.filter((click) => click === true).length);
    setClicked(clickStates);
  }, []);

  // 인풋
  const [content, onChangeContent, resetContent] = useInput(chosen.content);
  const [image, onImageChange, resetImage] = useImageInputs(chosen.image);

  // 리셋
  const reset = () => {
    setRating(0);
    resetContent();
    resetImage();
  };

  const addReview = useAddReview(
    content,
    rating,
    image,
    title,
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
        width="600px"
        height="800px"
        gap="0"
        onSubmit={type === 'post' ? (e) => addReview(e) : (e) => editReview(e)}
      >
        <S.ModalHeader>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              reset();
              closeModal();
            }}
          >
            닫기
          </div>
          <span>{title}</span>
        </S.ModalHeader>
        <S.StarBox>
          {ratingArr.map((num: number, idx: number) => {
            return (
              <FaStar
                key={idx}
                size={25}
                onClick={() => handleStarClick(num)}
                onMouseEnter={() => setHovered(num)}
                onMouseLeave={() => setHovered(0)}
                className={clicked[num] || hovered > num ? 'yellowStar' : ''}
              />
            );
          })}
        </S.StarBox>
        <S.ReviewForm>
          <S.InputArea value={content} onChange={(e) => onChangeContent(e)} />
          <label>
            <FaCamera size={48} />
            <input
              onChange={(e) => {
                onImageChange(e);
              }}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
          </label>
        </S.ReviewForm>
        <S.InputFooter>
          <div style={{ marginRight: 20 }}>{content.length}/500</div>
        </S.InputFooter>
        <S.ImageBox>
          {image.map((image, i) => {
            return <S.ModalImage src={image} key={i} />;
          })}
        </S.ImageBox>
        <button>등록</button>
      </S.ModalBox>
    </S.ModalContainer>
  );
};

export default ReviewModal;
