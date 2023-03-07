import { useCallback, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import * as S from './style/ReviewStyled';

interface Props {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  click: boolean[];
}

const ReviewStars = ({ rating, setRating, click }: Props) => {
  const [hovered, setHovered] = useState(0);
  const [clicked, setClicked] = useState(click);
  const ratingArr = [0, 1, 2, 3, 4];

  const handleStarClick = useCallback((index: number) => {
    const clickStates = [...clicked].map((_, i) => (i <= index ? true : false));
    setRating(clickStates.filter((click) => click === true).length);
    setClicked(clickStates);
  }, []);

  return (
    <S.StarContainer>
      <S.StarInfo>별점으로 관광지를 표현해주세요.</S.StarInfo>
      <S.StarBox>
        {ratingArr.map((num: number, idx: number) => {
          return (
            <FaStar
              key={idx}
              size={50}
              onClick={() => handleStarClick(num)}
              onMouseEnter={() => setHovered(num)}
              onMouseLeave={() => setHovered(0)}
              className={clicked[num] || hovered > num ? 'blueStar' : ''}
            />
          );
        })}
      </S.StarBox>
    </S.StarContainer>
  );
};

export default ReviewStars;
