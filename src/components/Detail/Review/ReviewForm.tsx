import { placeHolder } from '@/common/utils/defaults';
import React from 'react';
import { FaCamera } from 'react-icons/fa';
import * as S from './style/ReviewStyled';

interface Props {
  content: string;
  image: string[];
  onChangeContent: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReviewForm = ({
  content,
  image,
  onChangeContent,
  onChangeImage,
}: Props) => {
  const check = image.length >= 3;
  return (
    <S.ReviewForm>
      <S.ReviewPhotoRef>사진추가는 최대 3개까지 가능합니다.</S.ReviewPhotoRef>
      <S.ImageInput
        style={{
          cursor: check ? 'not-allowed' : 'pointer',
          color: check ? 'lightgray' : 'black',
        }}
      >
        <FaCamera size={20} />
        <S.HiddenInput
          onChange={(e) => {
            onChangeImage(e);
          }}
          type="file"
          accept="image/*"
          disabled={check}
        />
        <S.ImageInputTxt style={{ color: check ? 'lightgray' : 'black' }}>
          사진추가
        </S.ImageInputTxt>
      </S.ImageInput>
      <S.InputArea
        maxLength={500}
        placeholder={placeHolder}
        value={content}
        onChange={(e) => onChangeContent(e)}
      />
      <S.InputFooter>
        <div style={{ color: content.length >= 500 ? 'red' : 'black' }}>
          {content.length}/500
        </div>
      </S.InputFooter>
      <S.ImageBox>
        {image.map((image, i) => {
          return <S.ModalImage src={image} key={i} alt="review" />;
        })}
      </S.ImageBox>
    </S.ReviewForm>
  );
};

export default ReviewForm;
