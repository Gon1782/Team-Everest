import useImageInputs from '@/hooks/useImageInputs';
import useInput from '@/hooks/useInput';
import { modalState } from '@/recoil/modal';
import { useCallback, useRef, useState } from 'react';
import { FaStar, FaCamera } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as S from './ReviewStyled';
import { uuidv4 } from '@firebase/util';
import {
  doc,
  DocumentData,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/common/api/firebase';
import { DetailList } from '@/recoil/Detail';
import { Reviews } from '@/types/DetailType';

interface Props {
  title: string;
  id: string;
}

const ReviewModal = ({ title, id }: Props) => {
  const [text, onChangeText, resetTest] = useInput('');
  const [image, onImageChange, resetImage] = useImageInputs();
  const [user, setUser] = useState<DocumentData>();
  const list = useRecoilValue(DetailList);

  // 리셋 + 모달 종료
  const reset = () => {
    setRating(0);
    resetTest();
    resetImage();
    setModal(false);
  };

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

  // 모달 영역 밖 클릭시 닫기
  const modalref = useRef<HTMLFormElement>(null);
  const [_, setModal] = useRecoilState(modalState);

  const closeModalIfClickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        reset();
      }
    },
    [],
  );

  // GET USER DB
  const getUser = async () => {
    try {
      const docRef = doc(db, 'users', `firebaseUid`);
      const data = await getDoc(docRef);
      setUser(data.data());
    } catch (error) {
      console.log(error);
    }
  };

  // POST Review
  const addReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReview = {
      rating,
      content: text,
      createdAt: '',
      id: uuidv4(),
      image,
      title,
      uid: 'firebaseUid',
    };
    const newReviewData: Reviews = {
      ratingCount: list.ratingCount + 1,
      review: [...list.review, newReview],
      totalRating: list.totalRating + rating,
    };
    await getUser();
    // 첫 리뷰 일때 setDoc 두번째 리뷰부터 업데이트
    if (!list.review) await setDoc(doc(db, 'reviews', id), newReviewData);
    else await updateDoc(doc(db, 'reviews', id), { ...newReviewData });
    await updateDoc(doc(db, 'users', `firebaseUid`), {
      myReview: [...user?.myReview, newReview],
    });
    reset();
  };

  return (
    <S.ModalContainer onClick={(e) => closeModalIfClickOutside(e)}>
      <S.ModalBox ref={modalref} onSubmit={(e) => addReview(e)}>
        <S.ModalHeader>
          <button onClick={() => reset()}>닫기</button>
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
