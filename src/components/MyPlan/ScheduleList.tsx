import { NewPlanRecoil, PlanType } from '@/recoil/atom/MyPlan';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ScheduleDate from './ScheduleDate';
import Event from './Event';
import EventDropDown from './EventDropDown';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

const PlanScheduleList = ({
  dropDownRef,
}: {
  dropDownRef: React.MutableRefObject<any>;
}) => {
  const plan = useRecoilValue<PlanType>(NewPlanRecoil);
  const [planSchedule, setPlanSchedule] = useState<any>([]);

  useEffect(() => {
    setPlanSchedule(Object.keys(plan.schedule));
  }, [plan]);

  return (
    <PlanItemsSwiper
      modules={[Navigation, Pagination, Scrollbar]}
      navigation
      slidesPerView={2}
      spaceBetween={8}
      scrollbar={{ draggable: true, dragSize: 100 }}
    >
      {!!planSchedule?.length &&
        planSchedule.map((scheduleDate: any, index: number) => {
          return (
            <SlideBanner>
              <SlideBanner>
                <PlanItem key={index}>
                  <ScheduleDate // Day1 |20xx-몇월-며칠
                    planSchedule={planSchedule}
                    index={index}
                    scheduleDate={scheduleDate}
                  />
                  {!!plan.schedule[scheduleDate]?.length &&
                    plan.schedule[scheduleDate].map((item: any, index) => {
                      // 선택한 관광지들
                      return (
                        <>
                          <Event index={index} item={item} />
                          <EventDropDown
                            index={index}
                            scheduleDate={scheduleDate}
                            dropDownRef={dropDownRef}
                          />
                        </>
                      );
                    })}
                </PlanItem>
              </SlideBanner>
            </SlideBanner>
          );
        })}
    </PlanItemsSwiper>
  );
};

export default PlanScheduleList;

const PlanItemsSwiper = styled(Swiper)`
  display: flex;
  margin: 60px 0;
  width: 100%;
  min-height: 300px;
  height: auto;
`;

const PlanItem = styled.li`
  width: 100%;
  min-height: 300px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #2c2c2c;
  background-color: #fff;
`;

const SlideBanner = styled(SwiperSlide)`
  width: 100%;
  min-height: 450px;
  height: auto;
`;
