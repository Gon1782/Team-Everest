import React, { useState } from 'react';
import { nowSchedule } from '@/atom/calender/scheduleState';
import { useRecoilState, useRecoilValue } from 'recoil';

const ScheduleItem = ({ folder }: { folder: string }) => {
  const schedule = useRecoilValue(nowSchedule);
  return (
    <>
      {schedule[folder].map((item: any) => {
        return (
          <div style={{ width: 100, height: 100 }}>
            <div>{item.schedule.yyyymmdd}</div>

            <div>{item.data}</div>
            <div>{item.schedule.amPm}</div>
          </div>
        );
      })}
    </>
  );
};

export default ScheduleItem;
