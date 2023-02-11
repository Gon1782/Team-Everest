import styled from 'styled-components';
import { RiBallPenFill } from 'react-icons/ri';
import { Image, ImageBox } from '@/components/Detail/Review/ReviewStyled';

const Mypage = () => {
  return (
    <MyPageContainer>
      <ProfileSection>
        <MyBackImage />
        <ProfileBox>
          <ProfileImageBox>
            <ProfileImage
              src={
                'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
              }
            />
            <BtnBox>
              <ProfileBtn>Change</ProfileBtn>
              <ProfileBtn>Delete</ProfileBtn>
            </BtnBox>
          </ProfileImageBox>
          <ProfilInfoBox>
            <NicknameBox>
              <span>김치워리어</span>
              <RiBallPenFill size={24} style={{ cursor: 'pointer' }} />
            </NicknameBox>
            <MyText>한줄소개</MyText>
          </ProfilInfoBox>
        </ProfileBox>
      </ProfileSection>
      {/* 나의 위시리스트 섹션 아마도? */}
      {/* 나의 플래너 섹션 */}
      <MyReviewSection>
        <MyReviewTitle>나의 리뷰 리스트</MyReviewTitle>
        <MyReviewContainer>
          <MyReviewBox>
            <MyReviewHeader>
              <MyReviewProfile
                src={
                  'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
                }
              />
              <span>김치워리어</span>
            </MyReviewHeader>
            <MyReviewInfoBox>
              <span>장소명</span>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  paddingTop: '.5rem',
                  paddingBottom: '.5rem',
                }}
              >
                ⭐⭐⭐⭐⭐
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  fontSize: '1rem',
                  padding: '1rem',
                }}
              >
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
              </div>
              <ImageBox
                style={{
                  display: 'flex',
                  gap: '1rem',
                  margin: 0,
                  width: '100%',
                }}
              >
                <Image
                  src={
                    'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
                  }
                />
                <Image
                  src={
                    'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
                  }
                />
                <Image
                  src={
                    'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
                  }
                />
                <Image
                  src={
                    'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
                  }
                />
              </ImageBox>
            </MyReviewInfoBox>
          </MyReviewBox>
        </MyReviewContainer>
      </MyReviewSection>
    </MyPageContainer>
  );
};

export default Mypage;

const MyPageContainer = styled.main`
  width: 100%;
  height: 100%;
  background-color: gray;
  padding: 0 0 3rem;
`;
const ProfileSection = styled.section`
  position: relative;
  width: 100%;
  height: 725px;
`;
const MyBackImage = styled.img`
  position: absolute;
  width: 100%;
  height: 500px;
  background-color: green;
  border: none;
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 1344px;
  height: 100%;
  margin: auto;
`;
const ProfileImageBox = styled.div`
  width: 350px;
  height: 400px;
`;
const ProfileImage = styled.img`
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  background-color: blue;
  z-index: 1;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 50px;
`;
const ProfileBtn = styled.button`
  cursor: pointer;
  color: black;
  background-color: transparent;
  border: none;
  width: 50%;
  font-size: 1.5rem;
  padding: 0;
`;
const ProfilInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 194px;
  font-size: 1.5rem;
`;
const NicknameBox = styled.div`
  display: flex;
  gap: 3rem;
  line-height: 1.5rem;
  padding: 1rem 2rem;
`;
const MyText = styled.span`
  width: 100%;
  line-height: 1.5rem;
  padding: 1rem 2rem;
`;
const MyReviewSection = styled.section`
  max-width: 1344px;
  background-color: white;
  margin: 3rem auto 0;
  padding: 0 0 1rem;
  border-radius: 20px;
`;
const MyReviewTitle = styled.header`
  width: 100%;
  padding: 2rem;
  font-size: 2rem;
`;
const MyReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(388px, max-content));
  grid-gap: 1rem;
  justify-content: center;
  width: 100%;
`;
const MyReviewBox = styled.div`
  width: 388px;
  height: 420px;
  background-color: gray;
  padding: 1rem;
  border-radius: 20px;
`;
const MyReviewHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  font-size: 1.5rem;
`;
const MyReviewProfile = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;
const MyReviewInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 2rem;
  gap: 1.5rem;
  margin-top: 2rem;
`;
