import React, { useState } from 'react';
import * as Style from './SidebarStyle';
import { cityInfo } from '@/common/utils/cityInfo';
import { useRecoilState } from 'recoil';
import { CityArea } from '@/recoil/atom/CityArea';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const [area, setArea] = useRecoilState(CityArea);

  const onClickHandler = (mapx: number, mapy: number, areacode: string) => {
    setArea({ mapx, mapy, level: 9, areacode });
  };

  return (
    <Style.Wrap>
      <Style.IconWrap
        onClick={() => {
          navigate('/main');
        }}
      >
        <FaArrowLeft size={25}></FaArrowLeft>
        <Style.Text>홈으로 이동</Style.Text>
      </Style.IconWrap>
      {cityInfo.map((data, index) => {
        return (
          <Style.ItemWrap
            key={index}
            onClick={() => {
              onClickHandler(data.mapx, data.mapy, data.areacode);
            }}
          >
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
