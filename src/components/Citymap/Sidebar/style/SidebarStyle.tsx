import styled from 'styled-components';

export const Wrap = styled.section`
  min-width: 18rem;
  z-index: 20;
  background-color: #fff;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    border-radius: 6px;
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 6px;
  }
`;

export const IconWrap = styled.div`
  position: sticky;
  cursor: pointer;
  margin-left: 10px;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  top: 0;
  background-color: white;
`;

export const Text = styled.span`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 700;
`;

export const ItemWrap = styled.div`
  cursor: pointer;
  width: 100%;
  height: 8rem;
  border-bottom: solid 1px #000;
  display: flex;
  align-items: center;
  gap: 20px;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const ImageWrap = styled.div`
  /* height: 100px; */
  margin-left: 10px;
`;

export const title = styled.span`
  font-weight: 700;
  font-size: 18px;
`;
export const SideBarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`;
