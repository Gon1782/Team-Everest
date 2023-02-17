import { useCallback, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { FaStar, FaCamera } from 'react-icons/fa';
import useAddReview from '@/hooks/useAddReview';
import useInput from '@/hooks/useInput';
import useImageInputs from '@/hooks/useImageInputs';
import { reviewModalState } from '@/recoil/atom/ReviewModal';
import * as S from './style/ReviewStyled';

interface Props {
  title?: string;
  id?: string;
}

const ReviewModal = ({ title, id }: Props) => {
  const contentId = !!id ? id : '';

  // 로그인 여부 확인
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 별점 관련
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const ratingArr = [0, 1, 2, 3, 4];

  const handleStarClick = useCallback((index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setRating(clickStates.filter((x) => x === true).length);
    setClicked(clickStates);
  }, []);

  // 인풋
  const [text, onChangeText, resetTest] = useInput('');
  const [image, onImageChange, resetImage] = useImageInputs();

  // 리셋
  const reset = () => {
    setRating(0);
    resetTest();
    resetImage();
  };

  // POST Review
  const addReview = useAddReview(text, rating, image, contentId, uid, reset);

  // 모달 영역 밖 클릭시 닫기
  const modalref = useRef<HTMLFormElement>(null);
  const setModal = useSetRecoilState(reviewModalState);

  const closeModalIfClickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        setModal(false);
        reset();
      }
    },
    [],
  );

  return (
    <S.ModalContainer onClick={(e) => closeModalIfClickOutside(e)}>
      <S.ModalBox ref={modalref} onSubmit={(e) => addReview(e)}>
        <S.ModalHeader>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              reset();
              setModal(false);
            }}
          >
            닫기
          </div>
          <span>{title}</span>
        </S.ModalHeader>
        <S.StarBox>
          {ratingArr.map((el: number, idx: number) => {
            return (
              <FaStar
                key={idx}
                size={25}
                onClick={() => handleStarClick(el)}
                onMouseEnter={() => setHovered(el)}
                onMouseLeave={() => setHovered(0)}
                className={clicked[el] || hovered > el ? 'yellowStar' : ''}
              />
            );
          })}
        </S.StarBox>
        <S.ReviewForm>
          <S.InputArea value={text} onChange={(e) => onChangeText(e)} />
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
          <div style={{ marginRight: 20 }}>{text.length}/500</div>
        </S.InputFooter>
        <S.ImageBox>
          {image.map((x, i) => {
            return <S.ModalImage src={x} key={i} />;
          })}
        </S.ImageBox>
        <button>등록</button>
      </S.ModalBox>
    </S.ModalContainer>
  );
};

export default ReviewModal;
