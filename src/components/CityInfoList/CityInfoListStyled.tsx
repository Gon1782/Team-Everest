import styled from 'styled-components';

// CityInfoList

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 100px;
`;

export const SectionInfo = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  line-height: 56px;
  margin-bottom: 40px;
  font-size: 2.2rem;
`;

export const Introduce = styled.div`
  line-height: 24px;
  margin-bottom: 80px;
  font-size: 1rem;
`;

export const Video = styled.div`
  width: 800px;
  height: 750px;
  background-color: #e37f7f;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const ContentWrap = styled.div`
  width: 60%;
  margin-left: 150px;
`;

export const ContentItemWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

// CityInfoListItem

export const Image = styled.img`
  width: 400px;
  height: 250px;
  border-radius: 20px;
  margin-right: 30px;
`;

export const ContentInfoWrap = styled.div`
  width: 400px;
  height: 250px;
  border: 1px solid lightgrey;
  border-radius: 20px;
  gap: 20px;
  padding: 20px;
`;

export const TourName = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const TourAddr = styled.p`
  margin-bottom: 20px;
`;

export const TourTags = styled.div`
  width: 350px;
  height: 30px;
  background-color: cornflowerblue;
  margin-bottom: 20px;
`;

export const TourRating = styled.div`
  font-size: 1.2rem;
`;
