import { useCallback, useRef, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FaStar, FaCamera } from 'react-icons/fa';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { db } from '@/common/api/firebase';
import { getDate } from '@/common/utils/getDate';
import useInput from '@/hooks/useInput';
import useImageInputs from '@/hooks/useImageInputs';
import { reviewModalState } from '@/recoil/atom/ReviewModal';
import { DetailList } from '@/recoil/atom/Detail';
import { Document } from '@/types/DetailType';
import * as S from './style/ReviewStyled';

interface Props {
  title: string;
  id: string;
}

const ReviewModal = ({ title, id }: Props) => {
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const uid = !!sessionStorage.getItem(sessionKey)
    ? JSON.parse(sessionStorage.getItem(sessionKey)).uid
    : '';

  const [text, onChangeText, resetTest] = useInput('');
  const [image, onImageChange, resetImage] = useImageInputs();
  const [user, setUser] = useState<Document>();
  const list = useRecoilValue(DetailList);
  const [date, time] = getDate();

  // 리셋 + 모달 종료
  const reset = () => {
    setRating(0);
    resetTest();
    resetImage();
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
  const [_, setModal] = useRecoilState(reviewModalState);

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
      const docRef = doc(db, 'users', `${uid}`);
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
      createdAt: `${date} ${time}`,
      id: uuidv4(),
      image,
      contentId: id,
      uid,
      isDelete: 'N',
    };
    const newReviewData = {
      ratingCount: !!list.ratingCount ? list.ratingCount + 1 : 1,
      review: !!list.review ? [...list?.review, newReview] : [newReview],
      totalRating: !!list.totalRating ? list.totalRating + rating : rating,
    };
    // 첫 리뷰 일때 setDoc 두번째 리뷰부터 업데이트
    if (!list.review) await setDoc(doc(db, 'reviews', id), newReviewData);
    else await updateDoc(doc(db, 'reviews', id), newReviewData);
    setModal(false);

    // USERDB POST
    await updateDoc(doc(db, 'users', `${uid}`), {
      MyReview: !!user.MyReview ? [...user?.MyReview, newReview] : [newReview],
    });
    reset();
  };

  useEffect(() => {
    getUser();
  }, []);

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
