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
  return (
    <S.ReviewForm>
      <S.ImageInput>
        <FaCamera size={24} />
        <S.HiddenInput
          onChange={(e) => {
            onChangeImage(e);
          }}
          type="file"
          accept="image/*"
        />
        <div>사진추가</div>
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
          return <S.ModalImage src={image} key={i} />;
        })}
      </S.ImageBox>
    </S.ReviewForm>
  );
};

export default ReviewForm;
