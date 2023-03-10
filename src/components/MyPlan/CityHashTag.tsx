import { PlanType } from '@/recoil/atom/MyPlan';
import React from 'react';
import { BsFlagFill } from 'react-icons/bs';

const CityHashTag = ({ plan }: { plan: PlanType }) => {
  //004A7C
  return (
    <>
      {plan?.mainArea.map((area: { name: number; count: number }) => {
        return (
          <div style={{ display: 'block' }}>
            <BsFlagFill size={30} color={'#EF4B27'} />
            <div
              style={{
                height: '30px',
                backgroundColor: '#e6e6e6',
                borderRadius: 50,
                padding: '0.4rem 0.5rem',
                lineHeight: '1rem',
              }}
            >
              <p
                style={{
                  width: 85,
                  color: '#004A7C',
                  fontSize: 15,
                  fontWeight: 500,
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
