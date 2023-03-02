import { useEffect, useRef, useState } from 'react';
import { themeService, locationService } from '@/recoil/atom/Category';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Item } from '@/types/DetailType';
import { DetailResponse } from '@/types/DetailType';
import { getSpot, getTourList } from '@/common/api/tourApi';
import SelectBox from './SelectBox';
import TourList from './TourList';
import { MdOutlineAddLocation } from 'react-icons/md';
import {
  TourListRecoil,
  PickScheduleRecoil,
  MyWishList,
  IsSidePageView,
} from '@/recoil/atom/MyPlan';
import styled from 'styled-components';
import { getUserDB } from '@/common/api/userApi';
import { SlMagnifier } from 'react-icons/sl';
import { placeHolder } from '@/common/utils/defaults';
// 검색 할 수 있는 사이드페이지, 일정 추가 버튼 클릭시 생김
const SidePage = () => {
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  const location = useRecoilValue(locationService);
  const theme = useRecoilValue(themeService);

  const [pickLocation, setPickLocation] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [pickTheme, setPickTheme] = useState('');
  const [keyword, setKeyword] = useState('');
  const [placeholder, setPlaceholder] = useState(false);

  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  const [tourList, setTourList] = useRecoilState<Item[]>(TourListRecoil);
  const setMyWishList = useSetRecoilState(MyWishList);

  const setIsSidePageView = useSetRecoilState(IsSidePageView);

  const searching = async () => {
    const { response } = await getSpot(keyword);
    //.response.body.items.item
    //console.log(response.body.items.item);
    setTourList(response.body.items.item);
    // console.log(response);
  };

  useEffect(() => {
    // 지역, 테마 선택했을 경우에만 돌수있게
    if (!!pickLocation && !!pickTheme) {
      getTourList(pickLocation, pickTheme, String(pageNo)).then(
        (result: DetailResponse) =>
          setTourList(result?.response.body.items.item),
      );
      setPageNo(pageNo + 1);
    }
  }, [pickLocation, pickTheme]);

  useEffect(() => {
    getUserDB(uid).then((result: any) => {
      setMyWishList(result.myWishPlace);
    });
    return () => {
      setTourList([]);
      setPageNo(1);
    };
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
    pageRef.current.addEventListener('scroll', keepCheckingScroll, true);

    // 컴포넌트 나가면 핸들러 제거하기

    return () => {
      pageRef.current?.removeEventListener('scroll', keepCheckingScroll, true);
    };
  }, [keepCheckingScroll]);

  return (
    <SidePageContainer ref={pageRef}>
      <ScheduleInfo>
        {pickSchedule.day} | ({pickSchedule.schedule})
        <QuitButton onClick={() => setIsSidePageView(false)}>x</QuitButton>
      </ScheduleInfo>
      <SelectBoxList>
        <MdOutlineAddLocation
          style={{ width: 20, height: 20 }}
        ></MdOutlineAddLocation>
        <SelectBox
          onChangeHandler={(event: any) => setPickLocation(event.target.value)}
          dataList={location}
          valueKey="지역"
          width="35%"
        />
        <SelectBox
          onChangeHandler={(event: any) => setPickTheme(event.target.value)}
          dataList={theme}
          valueKey="카테고리"
          width="65%"
        />
      </SelectBoxList>
      <SearchingSection>
        <SearchInput
          type="text"
          placeholder={
            placeholder ? '' : '생각하고 계셨던 장소를 검색해보세요!'
          }
          onFocus={() => setPlaceholder(true)}
          onBlur={() => setPlaceholder(false)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          textAlign={placeholder ? 'inherit' : 'center'}
        />
        <SlMagnifier onClick={searching} style={{ cursor: 'pointer' }} />
      </SearchingSection>
      <TourList />
    </SidePageContainer>
  );
};

export default SidePage;

const SidePageContainer = styled.div`
  width: 24%;
  position: absolute;
  height: 100%;
  left: 76%;
  top: 5%;
  overflow: auto;
  border-left: 1px solid black;
  padding: 10px 25px;
`;
const SearchingSection = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;
const SearchInput = styled.input<{ textAlign: string }>`
  width: 100%;
  outline: none;
  text-align: ${(props) => props.textAlign};
  font-size: 20px;
`;
const SelectBoxList = styled.div`
  display: flex;
  margin: 25px 0;
  align-items: center;
`;

const ScheduleInfo = styled.div`
  top: 5%;
  font-size: 25px;
  color: gray;
  margin: 20px 0;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

const QuitButton = styled.button`
  background-color: white;
`;
