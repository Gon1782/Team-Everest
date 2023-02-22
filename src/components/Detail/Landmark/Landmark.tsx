import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import useDefault from '@/hooks/useDefault';
import { Item } from '@/types/DetailType';
import * as S from './style/LandmarkStyled';

interface Props {
  landmark: Item;
}

const Landmark = ({ landmark }: Props) => {
  const navigate = useNavigate();
  // 북마크 여부만 확인
  const [bookMark, setBookMark] = useState(false);

  // 로그인 여부 확인
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 이미지
  const defaults = useDefault();
  const { defaultImage } = defaults();
  const img = !!landmark.firstimage ? landmark.firstimage : defaultImage;

  return (
    <S.LandmarkBox
      onClick={() => {
        navigate(`/detail/${landmark.contentid}`);
      }}
    >
      <S.LandmarkImg src={img} />
      <S.LandmarkInfo>
        <S.LandmarkBookmarkBox
          style={{ visibility: !!uid ? 'visible' : 'hidden' }}
        >
          <S.LandmarkBookmarkBack>
            <FaRegBookmark
              onClick={() => setBookMark(true)}
              style={{
                display: bookMark ? 'none' : 'flex',
              }}
            />
            <FaBookmark
              onClick={() => setBookMark(false)}
              style={{
                display: bookMark ? 'flex' : 'none',
              }}
              color="red"
            />
          </S.LandmarkBookmarkBack>
        </S.LandmarkBookmarkBox>
        <S.LandmarkTitle>{landmark.title}</S.LandmarkTitle>
      </S.LandmarkInfo>
    </S.LandmarkBox>
  );
};

export default Landmark;
