import { tagSelector } from '@/common/utils/selector';
import styled from 'styled-components';

interface Props {
  tags: string[];
  tag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReviewTags = ({ tags, tag, setTag }: Props) => {
  const addTag = (x: string) => {
    setTag([...tag, x]);
  };

  const removeTag = (x: string) => {
    const newTag = tag.filter((tag) => tag !== x);
    setTag(newTag);
  };
  return (
    <ReivewTagContainer>
      <ReviewTagTitle>이 곳이 마음에 든다면,</ReviewTagTitle>
      <ReviewTagSubTitle>
        좋았던 점들을 선택해서 공유해주세요!
      </ReviewTagSubTitle>
      <ReviewTagBox>
        <TagBox>
          {tags.map((x, i) => {
            const check = !!tag.filter((tag) => tag === x).length;
            return (
              <Tag
                onClick={() => (check ? removeTag(x) : addTag(x))}
                style={{
                  backgroundColor: check ? '#004A7C' : '#F9F7F7',
                  color: check ? 'white' : 'black',
                }}
                key={i}
              >
                {x}
              </Tag>
            );
          })}
        </TagBox>
      </ReviewTagBox>
    </ReivewTagContainer>
  );
};

export default ReviewTags;

export const ReivewTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.skyblue};
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const ReviewTagTitle = styled.span`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${(props) => props.theme.black};
  line-height: 28px;
  margin-bottom: 10px;
`;

export const ReviewTagSubTitle = styled.span`
  font-size: 1.37rem;
  color: ${(props) => props.theme.darkgrey};
  line-height: 24px;
`;

export const ReviewTagBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  margin: 1rem;
`;

export const Tag = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  background-color: ${(props) => props.theme.skyblue};
  border-radius: 30px;
`;
