import { useEffect, useState } from 'react';
import { themeService, locationService } from '@/recoil/atom/Category';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Item } from '@/types/DetailType';
import { DetailResponse } from '@/types/DetailType';
import { getTourList } from '@/common/api/detailApi';
import SelectBox from './SelectBox';
import TourList from './TourList';
import { TourListRecoil, PickScheduleRecoil } from '@/recoil/atom/MyPlan';

// 검색 할 수 있는 사이드페이지, 일정 추가 버튼 클릭시 생김
const SidePage = () => {
  const location = useRecoilValue(locationService);
  const theme = useRecoilValue(themeService);

  const [pickLocation, setPickLocation] = useState('');
  const [pickTheme, setPickTheme] = useState('');
  const setTourList = useSetRecoilState<Item[]>(TourListRecoil);
  const pickSchedule = useRecoilValue(PickScheduleRecoil);

  useEffect(() => {
    // 지역, 테마 선택했을 경우에만 돌수있게
    if (!!pickLocation && !!pickTheme) {
      getTourList(pickLocation, pickTheme).then((result: DetailResponse) =>
        setTourList(result?.response.body.items.item),
      );
    }
  }, [pickLocation, pickTheme]);

  return (
    <div>
      <>{pickSchedule.day} | </>
      <>{pickSchedule.schedule}</>
      <SelectBox
        onChangeHandler={(event) => setPickLocation(event.target.value)}
        dataList={location}
        valueKey="code"
      />
      <SelectBox
        onChangeHandler={(event) => setPickTheme(event.target.value)}
        dataList={theme}
        valueKey="contentTypeId"
      />
      <TourList />
    </div>
  );
};

export default SidePage;
