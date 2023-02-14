import { MyPlanRecoil, PlanType } from '@/recoil/atom/MyPlan';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const StartEndDate = () => {
  const myPlan = useRecoilValue<PlanType>(MyPlanRecoil);
  const schedule = Object.keys(myPlan.schedule);
  const startDate = schedule[0];
  const endDate = schedule[schedule.length - 1];
  return (
    <div>
      <div>시작일 :{startDate}</div>
      <div>종료일 :{endDate}</div>
    </div>
  );
};

export default StartEndDate;
