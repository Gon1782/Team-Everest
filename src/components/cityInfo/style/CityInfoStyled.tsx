import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 520px;
  background-color: ${(props) => props.theme.white};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 25px;
  margin-bottom: 80px;
`;
export const CityImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0px 25px;
`;
export const CitylImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

// 우측 도시 정보
export const CityInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 35px 25px;
  gap: 1rem;
`;
export const CityInfoHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const CityEngName = styled.div`
  color: ${(props) => props.theme.dimgrey};
  font-size: 1.25rem;
`;
export const CityHashtag = styled.div`
  display: flex;
  font-size: 16px;
  gap: 1rem;
`;
export const CityIntroBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin: 20px 0;
  border: 1px solid #efefef;
  border-radius: 20px;
  padding: 20px;
`;
export const CityIntroTitle = styled.div`
  display: flex;
  color: ${(props) => props.theme.navy};
  gap: 6px;
  line-height: 18px;
`;
export const CityIntroTitleTxt = styled.h5`
  font-weight: 700;
`;
export const CityIntroContent = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${(props) => props.theme.black};
`;
export const Citydesc = styled.div`
  font-size: 1.125rem;
  line-height: 26px;
  word-break: keep-all;
`;
