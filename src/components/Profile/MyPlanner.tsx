import React from 'react';
import { Document } from '@/types/DetailType';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  InitLocation,
  NewPlanRecoil,
  PickScheduleRecoil,
} from '@/recoil/atom/MyPlan';
import { useNavigate } from 'react-router-dom';
import { stringConvert } from '../MyPlan/MyPlannerHandler';
const MyPlanner = ({ user }: { user: Document }) => {
  const navigate = useNavigate();
  const setMyPlan = useSetRecoilState(NewPlanRecoil);
  const setPickSchedule = useSetRecoilState(PickScheduleRecoil);

  const moveToMyPlan = (item: any, index: number) => {
    const clonePlan = { ...item };
    clonePlan['startDate'] = { ...item.startDate };
    clonePlan['endDate'] = { ...item.endDate };

    setMyPlan(clonePlan);
    setPickSchedule({
      schedule: item.startDate['yyyymmdd'],
      day: `Day ${index + 1}`,
    });

    navigate(`/planner/my/${index}`);
  };
  return (
    <div>
      {!!user &&
        user['myPlanner']?.map((item: any, index: number) => {
          return (
            <div onClick={() => moveToMyPlan(item, index)}>{item?.name}</div>
          );
        })}
    </div>
  );
};

export default MyPlanner;
