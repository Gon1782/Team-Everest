import { PlanType } from '@/recoil/atom/MyPlan';
import React from 'react';
import { BsFlagFill } from 'react-icons/bs';

const CityHashTag = ({ plan }: { plan: PlanType }) => {
  return (
    <>
      {plan?.mainArea.map((area: { name: number; count: number }) => {
        return (
          <div style={{ display: 'block' }}>
            <BsFlagFill size={30} color={'#004A7C'} />
            <div
              style={{
                height: 25,
                backgroundColor: '#e6e6e6',
                borderRadius: 50,
                padding: '6% 0',
              }}
            >
              <p
                style={{
                  width: 85,
                  color: '#004A7C',
                  fontSize: 15,
                }}
              >
                #{area.name}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CityHashTag;
