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

export const Title = styled.h2`
  line-height: 55px;
`;

export const Introduce = styled.h5`
  line-height: 30px;
  font-weight: 300;
  margin-top: 25px;
  margin-bottom: 48px;
`;

export const Video = styled.div`
  width: 800px;
  height: 750px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 13px 14px 25px -17px rgba(0, 0, 0, 0.15);
  & video {
    object-fit: cover;
    border-radius: 0 20px 20px 0;
  }
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
  /* border: 1px solid ${(props) => props.theme.dimgrey}; */
  border-radius: 20px;
  gap: 30px;
  padding: 30px 25px;
  background-color: ${(props) => props.theme.white};
  box-shadow: 13px 14px 25px -17px rgba(0, 0, 0, 0.15);
`;

export const TourName = styled.h4`
  font-weight: 600;
  margin-bottom: 20px;
  word-break: keep-all;
  line-height: 35px;
`;

export const TourAddr = styled.p`
  margin-bottom: 1.375rem;
  color: ${(props) => props.theme.darkgrey};
  word-break: keep-all;
  font-size: 14px;
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
  background-color: ${(props) => props.theme.blue};
  color: #f2f2f2;
  padding: 8px 10px;
  border-radius: 20px;
  font-size: 1rem;
  text-align: center;
  line-height: 1rem;
`;

export const TourRating = styled.div`
  font-size: 1.2rem;
`;
