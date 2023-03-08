import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {
  areaSelector,
  modalSelector,
  tagSelector,
} from '@/common/utils/selector';
import useAddReview from '@/hooks/useAddReview';
import useInput from '@/hooks/useInput';
import useEditReview from '@/hooks/useEditReview';
import useImageInputs from '@/hooks/useImageInputs';
import { EachReview, Item } from '@/types/DetailType';
import ReviewStars from './ReviewStars';
import ReviewForm from './ReviewForm';
import * as S from './style/ReviewStyled';
import ReviewTags from './ReviewTags';

interface Props {
  type: string;
  item: Item;
  closeModal: () => void;
  closeModalIfClickOutside: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  review?: EachReview;
}

const ReviewModal = ({
  type,
  item,
  review,
  closeModal,
  closeModalIfClickOutside,
}: Props) => {
  // 수정 전 값들 불러오기
  const reviewId = !!review?.id ? review.id : '';
  const reviewContent = !!review?.content ? review.content : '';
  const reviewImg = !!review?.image ? review.image : [];
  const reviewRating = !!review?.rating ? review.rating : 0;
  const reviewTag = !!review?.tag ? review.tag : [];

  const [area, sigungu] = areaSelector(item.areacode, item.sigungucode);

  const chosen = modalSelector(
    type,
    reviewContent,
    reviewImg,
    reviewRating,
    reviewTag,
  );

  // 별점 관련
  const [rating, setRating] = useState(chosen.rating);

  // 인풋
  const [content, onChangeContent, resetContent] = useInput(chosen.content);
  const [image, onChangeImage, resetImage] = useImageInputs(chosen.image);
  const [tag, setTag] = useState(chosen.tags);
  const tags = tagSelector(item.cat2);

  useEffect(() => {}, [tag]);

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
    item.contentid,
    tag,
    tags,
    reset,
    closeModal,
  );

  const editReview = useEditReview(
    type,
    reviewId,
    rating,
    content,
    image,
    tag,
    reset,
    closeModal,
  );

  return (
    <S.ModalContainer onClick={(e) => closeModalIfClickOutside(e)}>
      <S.ModalBox
        width="1000px"
        height="900px"
        gap="0"
        onSubmit={type === 'post' ? (e) => addReview(e) : (e) => editReview(e)}
      >
        <S.ModalHeader>
          <S.ReviewName>
            <span>{item.title}</span>
            <S.ReviewAddr>{item.addr}</S.ReviewAddr>
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
        <ReviewTags tags={tags} tag={tag} setTag={setTag} />
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
