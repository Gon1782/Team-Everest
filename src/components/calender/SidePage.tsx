import { useEffect, useState } from 'react';
import { themeService, locationService } from '@/recoil/atom/Category';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Item } from '@/types/DetailType';
import { DetailResponse } from '@/types/DetailType';
import { getTourList } from '@/common/api/detailApi';
import SelectBox from './SelectBox';
import TourList from './TourList';

import {
  PickScheduleType,
  TourListRecoil,
  PickScheduleRecoil,
} from '@/recoil/atom/MyPlan';

// 검색 할 수 있는 사이드페이지
const SidePage = () => {
  const location = useRecoilValue(locationService);
  const theme = useRecoilValue(themeService);

  const [pickLocation, setPickLocation] = useState('');
  const [pickTheme, setPickTheme] = useState('');
  const [tourList, setTourList] = useRecoilState<Item[]>(TourListRecoil);
  const pickSchedule = useRecoilValue(PickScheduleRecoil);

  const onPickLocation = (event: any) => {
    setPickLocation(event.target.value);
  };

  const onPickTheme = (event: any) => {
    setPickTheme(event.target.value);
  };

  useEffect(() => {
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
        onChangeHandler={onPickLocation}
        dataList={location}
        valueKey="code"
      />
      <SelectBox
        onChangeHandler={onPickTheme}
        dataList={theme}
        valueKey="contentTypeId"
      />
      <TourList />
    </div>
  );
};

export default SidePage;
