import React from 'react';
import * as Style from './SidebarStyle';
import { cityInfo } from '@/common/utils/cityInfo';

const Sidebar = () => {
  return (
    <Style.Wrap>
      {cityInfo.map((data: any) => {
        return (
          <Style.ItemWrap>
            <Style.ImageWrap>
              <img src={data.image}></img>
            </Style.ImageWrap>
            {data.spec}
          </Style.ItemWrap>
        );
      })}
    </Style.Wrap>
  );
};

export default Sidebar;
