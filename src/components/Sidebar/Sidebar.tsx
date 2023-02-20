import React, { useState } from 'react';
import * as Style from './SidebarStyle';
import { cityInfo } from '@/common/utils/cityInfo';

const Sidebar = () => {
  return (
    <Style.Wrap>
      {cityInfo.map((data, index) => {
        return (
          <Style.ItemWrap key={index}>
            <Style.ImageWrap>
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '5px',
                }}
                src={require(`@/assets/CityImage/${index + 1}.jpg`).default}
              ></img>
            </Style.ImageWrap>
            <Style.title>{data.korarea}</Style.title>
          </Style.ItemWrap>
        );
      })}
    </Style.Wrap>
  );
};

export default Sidebar;
