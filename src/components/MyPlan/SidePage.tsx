import { useEffect, useState } from 'react';
import { themeService, locationService } from '@/recoil/atom/Category';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Item } from '@/types/DetailType';
import { DetailResponse } from '@/types/DetailType';
import { getTourList } from '@/common/api/detailApi';
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
  const [pickTheme, setPickTheme] = useState('');
  const setTourList = useSetRecoilState<Item[]>(TourListRecoil);
  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  const setMyWishList = useSetRecoilState(MyWishList);

  useEffect(() => {
    // 지역, 테마 선택했을 경우에만 돌수있게
    if (!!pickLocation && !!pickTheme) {
      getTourList(pickLocation, pickTheme).then((result: DetailResponse) =>
        setTourList(result?.response.body.items.item),
      );
    }
    return () => {
      setTourList([]);
    };
  }, [pickLocation, pickTheme]);

  useEffect(() => {
    getUserDB(uid).then((result: any) => {
      setMyWishList(result.myWishPlace);
    });
  }, []);

  return (
    <SidePageContainer>
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
  width: auto;
  position: absolute;
  left: 78%;
  top: 10%;
`;
const SelectBoxList = styled.div`
  display: flex;
`;
