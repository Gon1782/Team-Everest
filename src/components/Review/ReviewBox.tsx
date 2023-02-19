import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDB } from '@/common/api/userApi';
import { defaults } from '@/common/utils/defaults';
import useModal from '@/hooks/useModal';
import { Document, EachReview } from '@/types/DetailType';
import ReviewDelete from './ReviewDelete';
import ReviewModal from './ReviewModal';
import * as S from './style/ReviewStyled';

interface Props {
  review: EachReview;
}

const ReviewBox = ({ review }: Props) => {
  const navigate = useNavigate();

  // 삭제 확인 모달
  const [
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    closeDeleteModalIfClickOutside,
  ] = useModal();

  // 수정 모달
  const [
    editModal,
    openEditModal,
    closeEditModal,
    closeEditModalIfClickOutside,
  ] = useModal();

  // 내 리뷰인지 체크
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';
  const checkMine = review.uid === uid;

  // GET UserDB
  const [user, setUser] = useState<Document>();

  const getUser = async () => {
    const data = await getUserDB(review.uid);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  // 프로필 사진
  const { defaultProfile } = defaults();
  const profileImg = !!user?.photoURL ? user?.photoURL : defaultProfile;

  return (
    <S.Review>
      {deleteModal && (
        <ReviewDelete
          user={user}
          id={review.id}
          closeModal={closeDeleteModal}
          closeModalIfClickOutside={closeDeleteModalIfClickOutside}
        />
      )}
      {editModal && (
        <ReviewModal
          type="edit"
          id={review.contentId}
          title={review.title}
          closeModal={closeEditModal}
          closeModalIfClickOutside={closeEditModalIfClickOutside}
          user={user}
          review={review}
        />
      )}
      <S.Profile src={profileImg} />
      <S.ReviewContent>
        <S.ReviewSpace>
          <S.ReviewNickname
            onClick={() => navigate('/my', { state: review.uid })}
          >
            {user?.displayName}&nbsp;
          </S.ReviewNickname>
          <S.ReviewBtnBox
            style={{
              display: checkMine ? 'flex' : 'none',
            }}
          >
            <button onClick={() => openEditModal()}>수정</button>
            <button onClick={() => openDeleteModal()}>삭제</button>
          </S.ReviewBtnBox>
        </S.ReviewSpace>
        <div>{'⭐'.repeat(Number(review.rating))}</div>
        <div style={{ fontSize: '1.25rem' }}>{review.content}</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {review.image.map((image: string, i: number) => {
            return <S.ReviewImage src={image} key={i} />;
          })}
        </div>
        <span style={{ color: 'gray' }}>{review.createdAt}</span>
      </S.ReviewContent>
    </S.Review>
  );
};

export default ReviewBox;
