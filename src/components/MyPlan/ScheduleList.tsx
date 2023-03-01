import { NewPlanRecoil, PlanType } from '@/recoil/atom/MyPlan';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ScheduleDate from './ScheduleDate';
import Event from './Event';
import EventDropDown from './EventDropDown';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Draggable from 'react-draggable';
import quartersToMonths from 'date-fns/quartersToMonths';

const PlanScheduleList = ({
  eventRef,
  scheduleRef,
}: {
  eventRef: React.MutableRefObject<any>;
  scheduleRef: React.MutableRefObject<any>;
}) => {
  const plan = useRecoilValue<PlanType>(NewPlanRecoil);
  const [planSchedule, setPlanSchedule] = useState<any>([]);

  useEffect(() => {
    setPlanSchedule(Object.keys(plan.schedule));
  }, [plan]);

  const drag = () => {
    // e.preventDefault();
    // e.stopPropagation();
    alert('s');
  };

  // useEffect(() => {
  //   if (scheduleRef.current?.length !== 0) {
  //     console.log(scheduleRef.current[0]);
  //   }
  // }, [drag]);

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
              <PlanItem>
                <ScheduleDate // Day1 |20xx-몇월-며칠
                  planSchedule={planSchedule}
                  index={index}
                  scheduleDate={scheduleDate}
                  scheduleRef={scheduleRef}
                />

                {!!plan.schedule[scheduleDate]?.length ? (
                  plan.schedule[scheduleDate].map((event: any, index) => {
                    // 선택한 관광지들
                    return (
                      <>
                        <Event index={index} item={event} />
                        <EventDropDown
                          index={index}
                          scheduleDate={scheduleDate}
                          eventRef={eventRef}
                        />
                      </>
                    );
                  })
                ) : (
                  <>
                    <div> 아직 여행 일정이 없어요 ! </div>
                    <div>셰르파와 함께 여행 일정을 계획해보세요</div>
                  </>
                )}
              </PlanItem>
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
