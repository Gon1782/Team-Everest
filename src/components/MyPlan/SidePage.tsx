import { useEffect, useRef, useState } from 'react';
import { themeService, locationService } from '@/recoil/atom/Category';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Item } from '@/types/DetailType';
import { DetailResponse } from '@/types/DetailType';
import { getSpot, getTourList } from '@/common/api/tourApi';
import SelectBox from './SelectBox';
import TourList from './TourList';
import { MdOutlineAddLocation } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';
import {
  TourListRecoil,
  PickScheduleRecoil,
  MyWishList,
  IsSidePageView,
} from '@/recoil/atom/MyPlan';
import styled from 'styled-components';
import { getUserDB } from '@/common/api/userApi';
import { SlMagnifier } from 'react-icons/sl';
import { BsFlagFill } from 'react-icons/bs';

// 검색 할 수 있는 사이드페이지, 일정 추가 버튼 클릭시 생김
const SidePage = () => {
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  const location = useRecoilValue(locationService);
  const theme = useRecoilValue(themeService);

  const [pickLocation, setPickLocation] = useState('');
  const [pageNo, setPageNo] = useState(2);
  const [pickTheme, setPickTheme] = useState('');
  const [keyword, setKeyword] = useState('');
  const [placeholder, setPlaceholder] = useState(false);
  const pageRef = useRef<any>();

  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  const [tourList, setTourList] = useRecoilState<Item[]>(TourListRecoil);
  const [isShowMyWish, setIsShowMyWish] = useState(false);
  const [myWishList, setMyWishList] = useRecoilState(MyWishList);
  const [dataList, setDataList] = useState<Item[]>([]);

  const setIsSidePageView = useSetRecoilState(IsSidePageView);
  let prevPageNo = 0;

  // 키워드 검색하여 관광지 검색하기
  const searching = async () => {
    const { response } = await getSpot(keyword, 10, 1);
    setDataList(response.body.items.item);
    setTourList(response.body.items.item);
    setIsShowMyWish(false);
  };

  // 카테고리 선택하여 관광지 데이터 가져오기
  const getSpotList = (
    pickLocation: string,
    pickTheme: string,
    pageNo: number,
  ) => {
    if (
      !!pickLocation &&
      !!pickTheme &&
      pickLocation !== '지역' &&
      pickTheme !== '카테고리'
    ) {
      getTourList(pickLocation, pickTheme, pageNo).then(
        (result: DetailResponse) => {
          setDataList((prev) => {
            return prev.concat(result?.response.body.items.item);
          });
          setTourList((prev) => {
            return prev.concat(result?.response.body.items.item);
          });
          setPageNo(pageNo + 1);
          setIsShowMyWish(false);
        },
      );
    }
  };

  //지역/테마 선택시 해당 데이터 리스트 가져오기
  useEffect(() => {
    // 지역, 테마 선택했을 경우에만 돌수있게
    setDataList([]);
    setTourList([]);
    getSpotList(pickLocation, pickTheme, 1);
  }, [pickLocation, pickTheme]);

  // 저장한 장소만 보기 클릭시
  useEffect(() => {
    isShowMyWish ? setDataList(myWishList) : setDataList(tourList);
    // setDataList(myWishList);
  }, [isShowMyWish]);

  // wish 리스트 가져오기, 언마운트시에 초기화
  useEffect(() => {
    getUserDB(uid).then((result: any) => {
      setMyWishList(result.myWishPlace);
    });
    return () => {
      setDataList([]);
      setTourList([]);
      setPageNo(2);
    };
  }, []);

  const keepCheckingScroll = () => {
    // 스크롤바 길이 , 스크롤바의 위치 , 해당 컴포넌트 높이
    const { scrollHeight, scrollTop, clientHeight } = pageRef.current;

    if (clientHeight + scrollTop >= scrollHeight - 1 && !isShowMyWish) {
      if (prevPageNo === pageNo) return; // 끝까지 내렸을때 이상하게 2번 호출 되어서 pageNo가 두번 넘어감 그래서 막아놓음
      getSpotList(pickLocation, pickTheme, pageNo);
      prevPageNo = pageNo;
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
        <QuitButton onClick={() => setIsSidePageView(false)}>
          <GrClose />
        </QuitButton>
      </ScheduleInfo>
      <SelectBoxList>
        <BsFlagFill size={20} color={'#005691'} />
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
      <TourList
        list={dataList}
        setIsShowMyWish={setIsShowMyWish}
        pickSchedule={pickSchedule}
        isShowMyWish={isShowMyWish}
      />
    </SidePageContainer>
  );
};

export default SidePage;

const SidePageContainer = styled.div`
  width: 25%;
  position: fixed;
  height: 100%;
  left: 87%;
  top: 55%;
  transform: translate(-50%, -50%);
  overflow: auto;
  padding: 10px 25px;
  z-index: 999;
  background-color: white;
  border-left: 1px solid #e6e6e6;
`;
const SearchingSection = styled.div`
  display: flex;
  margin: 40px 0;
  border-bottom: 1px solid #e6e6e6;
  align-items: center;
`;
const SearchInput = styled.input<{ textAlign: string }>`
  width: 100%;
  outline: none;
  text-align: ${(props) => props.textAlign};
  font-size: 15px;
  margin: 10px 0;
`;
const SelectBoxList = styled.div`
  display: flex;
  margin: 25px 0;
  align-items: center;
`;

const ScheduleInfo = styled.div`
  top: 5%;
  font-size: 20px;
  color: gray;
  margin: 20px 0;

  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
`;

const QuitButton = styled.button`
  background-color: white;
`;
