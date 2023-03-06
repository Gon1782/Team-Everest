import { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { HiOutlineTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { getUserDB } from '@/common/api/userApi';
import useDefault from '@/hooks/useDefault';
import useModal from '@/hooks/useModal';
import { EachReview, Item } from '@/types/DetailType';
import { UserData } from '@/types/UserType';
import ReviewDelete from './ReviewDelete';
import ReviewModal from './ReviewModal';
import * as S from './style/ReviewStyled';

interface Props {
  item: Item;
  review: EachReview;
}

const ReviewBox = ({ item, review }: Props) => {
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
  const [user, setUser] = useState<UserData>();

  const getUser = async () => {
    await getUserDB(review.uid)
      .then((res) => setUser(res))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getUser();
  }, []);

  // 프로필 사진
  const defaults = useDefault();
  const { defaultProfile } = defaults();
  const profileImg = !!user?.photoURL ? user?.photoURL : defaultProfile;

  const tag = [...review.tag].sort();

  const rating = [false, false, false, false, false].map((_, i) =>
    i < review.rating ? true : false,
  );

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
          item={item}
          closeModal={closeEditModal}
          closeModalIfClickOutside={closeEditModalIfClickOutside}
          review={review}
        />
      )}
      <S.ReviewLeftBox onClick={() => navigate('/my', { state: review.uid })}>
        <S.Profile src={profileImg} alt="profile" />
        <S.ReviewNickname>{user?.displayName}</S.ReviewNickname>
        <div>
          {rating.map((x, i) =>
            x ? (
              <FaStar color="#0039CB" size={24} key={i} />
            ) : (
              <FaRegStar color="#0039CB" size={24} key={i} />
            ),
          )}
        </div>
      </S.ReviewLeftBox>
      <S.ReviewContentBox>
        <S.ReviewSpace>
          <S.ReviewCreatedAt>{review.createdAt}</S.ReviewCreatedAt>
          <S.ReviewBtnBox
            style={{
              display: checkMine ? 'flex' : 'none',
            }}
          >
            <BsPencil
              onClick={() => openEditModal()}
              color="#9DB9FF"
              size={25}
            />
            <HiOutlineTrash onClick={() => openDeleteModal()} size={25} />
          </S.ReviewBtnBox>
        </S.ReviewSpace>
        <S.ReviewTagsBox>
          {tag.map((x, i) => (
            <S.ReviewTag key={i}>{x}</S.ReviewTag>
          ))}
        </S.ReviewTagsBox>
        <S.ReviewContent>{review.content}</S.ReviewContent>
        <S.ReviewImageBox>
          {review.image.map((image: string, i: number) => {
            return <S.ReviewImage src={image} key={i} alt="review" />;
          })}
        </S.ReviewImageBox>
      </S.ReviewContentBox>
    </S.Review>
  );
};

export default ReviewBox;
