import { useEffect, useRef, useState } from 'react';
import { themeService, locationService } from '@/recoil/atom/Category';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Item } from '@/types/DetailType';
import { DetailResponse } from '@/types/DetailType';
import { getTourList } from '@/common/api/tourApi';
import SelectBox from './SelectBox';
import TourList from './TourList';
import {
  TourListRecoil,
  PickScheduleRecoil,
  MyWishList,
} from '@/recoil/atom/MyPlan';
import styled from 'styled-components';
import { getUserDB } from '@/common/api/userApi';

// 검색 할 수 있는 사이드페이지, 일정 추가 버튼 클릭시 생김
const SidePage = () => {
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : ''; // 드롭 다운 레퍼런스 객체, calenderView 컴포넌트에서 초기화함

  const location = useRecoilValue(locationService);
  const theme = useRecoilValue(themeService);

  const [pickLocation, setPickLocation] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [pickTheme, setPickTheme] = useState('');

  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  const [tourList, setTourList] = useRecoilState<Item[]>(TourListRecoil);
  const setMyWishList = useSetRecoilState(MyWishList);

  useEffect(() => {
    // 지역, 테마 선택했을 경우에만 돌수있게
    if (!!pickLocation && !!pickTheme) {
      getTourList(pickLocation, pickTheme, String(pageNo)).then(
        (result: DetailResponse) =>
          setTourList(result?.response.body.items.item),
      );
      setPageNo(pageNo + 1);
    }

    return () => {
      setTourList([]);
      setPageNo(1);
    };
  }, [pickLocation, pickTheme]);

  useEffect(() => {
    getUserDB(uid).then((result: any) => {
      setMyWishList(result.myWishPlace);
    });
  }, []);

  const pageRef = useRef<any>();
  const keepCheckingScroll = () => {
    // 스크롤바 길이 , 스크롤바의 위치 , 해당 컴포넌트 높이
    const { scrollHeight, scrollTop, clientHeight } = pageRef.current;
    if (clientHeight + scrollTop >= scrollHeight - 1) {
      getTourList(pickLocation, pickTheme, String(pageNo)).then(
        (result: DetailResponse) =>
          setTourList(tourList.concat(result?.response.body.items.item)),
      );
      setPageNo(pageNo + 1);
    }
  };

  useEffect(() => {
    // 스크롤 움직임 체크 함수
    window.addEventListener('scroll', keepCheckingScroll, true);

    // 컴포넌트 나가면 핸들러 제거하기
    return () => {
      window.removeEventListener('scroll', keepCheckingScroll, true);
    };
  }, [keepCheckingScroll]);

  return (
    <SidePageContainer ref={pageRef}>
      <>
        {pickSchedule.day} | {pickSchedule.schedule}
      </>
      <SelectBoxList>
        <SelectBox
          onChangeHandler={(event: any) => setPickLocation(event.target.value)}
          dataList={location}
          valueKey="code"
        />
        <SelectBox
          onChangeHandler={(event: any) => setPickTheme(event.target.value)}
          dataList={theme}
          valueKey="contentTypeId"
        />
      </SelectBoxList>
      <TourList />
    </SidePageContainer>
  );
};

export default SidePage;

const SidePageContainer = styled.div`
  width: 300px;
  position: absolute;
  height: 1000px;
  left: 78%;
  top: 10%;
  overflow: scroll;
`;
const SelectBoxList = styled.div`
  display: flex;
`;
