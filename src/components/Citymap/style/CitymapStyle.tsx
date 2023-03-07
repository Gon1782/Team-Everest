import styled from 'styled-components';

// export const Wrap = styled.section`
//   width: 100vw;
//   min-height: 100%;
// `;

// export const Mapbox = styled.div`
//   width: 100%;
//   height: 100vh;
// `;
// export const Mapbox = styled.div`
//   width: 400px;
//   height: 400px;
// `;
export const Wrap = styled.section`
  width: 100%;
  min-height: 100%;
`;
export const Mapbox = styled.div`
  width: 100%;
  height: 100vh;
`;

export const StyleWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.082);
  backdrop-filter: blur(2px);
  z-index: 99999;
`;

export const ModalBox = styled.div`
  position: fixed;
  width: 1200px;
  height: 450px;
  top: 50%;
  left: 50%;
  background: #fff;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 30px;
  align-items: center;
`;
export const ModalImg = styled.img`
  width: 668px;
  height: inherit;
  border-radius: 8px;
  object-fit: cover;
`;
export const StyleContent = styled.div`
  border-radius: 8px;
  width: 100%;
  max-width: 502px;
  height: inherit;
  padding: 20px 0;
`;

export const StyleCityTitleEng = styled.div`
  margin-top: 1rem;
  font-weight: 700;
  font-size: 25px;
`;

export const StyleCityTitleKor = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-top: 1rem;
`;

export const StyleCityDescript = styled.div`
  border-radius: 5px;
  color: #9d9d9d;
  margin-top: 2rem;
  font-size: 14px;
  line-height: 1.3;
  height: 100px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    border-radius: 6px;
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 6px;
  }
`;

export const StyleCityHashtag = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 16px;
`;

export const StyleCityWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
`;

export const TourName = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
export const StyleCityTourWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
`;
export const TourContent = styled.div`
  margin-top: 4px;
  font-size: 15px;
`;

//버튼
export const StyleButtomWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const StyleButton = styled.button`
  width: 160px;
  padding: 20px 20px;
  border-radius: 5px;
`;
