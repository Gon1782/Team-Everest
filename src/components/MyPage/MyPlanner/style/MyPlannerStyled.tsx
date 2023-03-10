import { VisibleProps } from '@/types/StyledType';
import { FaBookmark } from 'react-icons/fa';
import styled from 'styled-components';

export const MyPlannerSection = styled.section`
  width: 100%;
  margin: 52px auto;
  padding: 0.8rem;
  border-radius: 20px;
  background-color: ${(props) => props.theme.grey};
  border-radius: 20px;
`;

export const MyPlannerTitle = styled.h3`
  width: 100%;
  padding: 2rem 0;
  margin: 0 auto;
  text-align: center;
`;

export const MyPlannerContainer = styled.div<VisibleProps>`
  display: flex;
  width: 91%;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    border-radius: 6px;
    background: #fff;
    visibility: ${(props) => props.visible};
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 6px;
  }
`;
export const BookMarkIcon = styled(FaBookmark)`
  color: ${(props) => props.theme.blue};
  size: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const MyPlannerBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: #333333c2;
  color: ${(props) => props.theme.grey};
  border-radius: 50%;
  margin-bottom: 20px;
  position: 'relative';
  transition: all 0.3s;
  font-weight: 400;
  font-size: 1.175rem;
  &:hover {
    background-color: ${(props) => props.theme.mediumgrey};
    color: #333333c2;
  }
`;

export const MyPlannerName = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
`;

export const MyPlannerViewMore = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  height: 300px;
  background-color: #333333c2;
  color: ${(props) => props.theme.grey};
  border-radius: 50%;
  margin-bottom: 20px;
  transition: all 0.3s;
  font-weight: 400;
  font-size: 1.175rem;
  &:hover {
    background-color: ${(props) => props.theme.mediumgrey};
    color: #333333c2;
  }
`;

export const MyPlannerNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 332px;
`;
