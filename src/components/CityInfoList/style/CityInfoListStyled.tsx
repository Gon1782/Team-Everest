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
  line-height: 3.5rem;
  margin-bottom: 40px;
  font-size: 3.125rem;
`;

export const Introduce = styled.div`
  line-height: 2rem;
  margin-bottom: 80px;
  font-size: 1.688rem;
`;

export const Video = styled.div`
  width: 800px;
  height: 750px;
  background-color: #e37f7f;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const ContentWrap = styled.div`
  margin-left: 120px;
`;

export const ContentItemWrap = styled.div`
  display: flex;
  margin-bottom: 30px;
  cursor: pointer;
`;

// CityInfoListItem

export const Image = styled.img`
  width: 400px;
  height: 250px;
  border-radius: 20px;
  margin-right: 30px;
`;

export const ContentInfoWrap = styled.div`
  width: 435px;
  height: 250px;
  border: 1px solid lightgrey;
  border-radius: 20px;
  gap: 30px;
  padding: 30px 25px;
`;

export const TourName = styled.h2`
  font-size: 27px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222222;
  word-break: keep-all;
`;

export const TourAddr = styled.p`
  margin-bottom: 1.375rem;
  font-size: 20px;
  color: #222222;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const TourCat = styled.span`
  display: inline-block;
  min-width: 95px;
  height: 35px;
  background-color: #5690c7;
  color: #f2f2f2;
  padding: 8px 10px;
  border-radius: 20px;
  font-size: 1.125rem;
  text-align: center;
  line-height: 1rem;
`;

export const TourRating = styled.div`
  font-size: 1.2rem;
`;
