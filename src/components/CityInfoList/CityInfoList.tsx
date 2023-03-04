import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCityTourInfo } from '@/common/api/tourApi';
import { DetailResponse, Item } from '@/types/DetailType';
import { useRef } from 'react';
import useDefault from '@/hooks/useDefault';
import CityListItem from './CityListItem';
import * as S from './CityInfoListStyled';

interface Props {
  id?: any;
  city: any;
}

const CityInfoList = ({ id, city }: Props) => {
  const RanNumber = 5;

  const navigate = useNavigate();

  // 이미지
  const defaults = useDefault();
  const { defaultImage } = defaults();
  const {
    isLoading,
    data: cityItem,
    refetch,
    error,
  } = useQuery<DetailResponse>('getCityTourInfo', () => {
    return getCityTourInfo(id, RanNumber);
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  const filterdData = cityItem?.response.body.items.item;
  // console.log('filterdData', filterdData);

  return (
    <S.Container>
      <S.Video></S.Video>
      <S.ContentWrap>
        <S.SectionInfo>
          <S.Title>
            {city.name}를 표현할 수 있는
            <br />
            관광지를 소개해드릴게요!
          </S.Title>

          <S.Introduce>
            {city.name}의 매력을 빠짐없이 느낄 수 있도록
            <br /> 도와주는 셰르파와 함께 여행을 시작하세요.
          </S.Introduce>
        </S.SectionInfo>
        {filterdData?.map((data: Item, index: number) => {
          const img = !!data?.firstimage ? data.firstimage : defaultImage;
          return (
            <S.ContentItemWrap
              key={index}
              onClick={() => navigate(`/detail/${data?.contentid}`)}
            >
              <CityListItem item={data} img={img} />
            </S.ContentItemWrap>
          );
        })}
      </S.ContentWrap>
    </S.Container>
  );
};

export default CityInfoList;
