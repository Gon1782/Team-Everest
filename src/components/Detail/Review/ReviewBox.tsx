import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDB } from '@/common/api/userApi';
import useDefault from '@/hooks/useDefault';
import useModal from '@/hooks/useModal';
import { Document, EachReview, Item } from '@/types/DetailType';
import ReviewDelete from './ReviewDelete';
import ReviewModal from './ReviewModal';
import * as S from './style/ReviewStyled';

interface Props {
  item: Item;
  review: EachReview;
}

const ReviewBox = ({ item, review }: Props) => {
  console.log(review);
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
  const defaults = useDefault();
  const { defaultProfile } = defaults();
  const profileImg = !!user?.photoURL ? user?.photoURL : defaultProfile;

  return (
    <S.Review>
      {deleteModal && (
        <ReviewDelete
          id={review.id}
          closeModal={closeDeleteModal}
          closeModalIfClickOutside={closeDeleteModalIfClickOutside}
        />
      )}
      {editModal && (
        <ReviewModal
          type="edit"
          id={review.contentId}
          title={item.title}
          addr={item.addr1}
          closeModal={closeEditModal}
          closeModalIfClickOutside={closeEditModalIfClickOutside}
          review={review}
        />
      )}
      <S.Profile src={profileImg} />
      <S.ReviewContentBox>
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
        <S.ReviewContent>{review.content}</S.ReviewContent>
        <S.ReviewImageBox>
          {review.image.map((image: string, i: number) => {
            return <S.ReviewImage src={image} key={i} />;
          })}
        </S.ReviewImageBox>
        <S.ReviewCreatedAt>{review.createdAt}</S.ReviewCreatedAt>
      </S.ReviewContentBox>
    </S.Review>
  );
};

export default ReviewBox;
