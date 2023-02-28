import React from 'react';
import * as Style from './CityInfoListStyled';
import { useQuery } from 'react-query';
import { getCityTourInfo } from '@/common/api/tourApi';
import { DetailResponse, Item } from '@/types/DetailType';
import { useRef } from 'react';
import useDefault from '@/hooks/useDefault';

const CityInfoList = ({ id }: any) => {
  const RanNumber = 5;

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
  // console.log(filterdData);

  return (
    <Style.Wrap>
      <Style.Title>이런 장소는 어떠신가요 ?</Style.Title>

      <Style.ContentWrap>
        {filterdData?.map((data: Item, index: number) => {
          const img = !!data?.firstimage ? data.firstimage : defaultImage;
          return (
            <Style.ContentItemWrap key={index}>
              <Style.Image src={img}></Style.Image>
              <Style.InfoWrap>
                <Style.TourName>{data.title}</Style.TourName>
              </Style.InfoWrap>
            </Style.ContentItemWrap>
          );
        })}
      </Style.ContentWrap>
    </Style.Wrap>
  );
};

export default CityInfoList;
