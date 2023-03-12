import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getCityTourInfo } from '@/common/api/tourApi';
import useDefault from '@/hooks/useDefault';
import { City } from '@/types/CityType';
import { DetailResponse, Item } from '@/types/DetailType';
import CityListItem from './CityListItem';
import * as S from './style/CityInfoListStyled';
import Error from '../Common/Error';
import ReactPlayer from 'react-player';

interface Props {
  city: City;
}

const CityInfoList = ({ city }: Props) => {
  const RanNumber = 1;

  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: cityItem,
    error,
    refetch,
  } = useQuery<DetailResponse, Error>('getCityTourInfo', () => {
    return getCityTourInfo(city?.areaCode, city?.sigunguCode, RanNumber);
  });

  useEffect(() => {
    refetch();
  }, [city]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>{error.message}</div>;

  if (!cityItem?.response) return <Error />;

  const filterdData = cityItem?.response.body.items.item;

  return (
    <S.Container>
      <S.Video>
        <ReactPlayer
          className="City-player"
          url={require('@/assets/CityImage/page_video.webm').default} // 플레이어 url
          width={'100%'}
          height={'100%'}
          playing={true} // 자동 재생 on
          muted={true}
          loop={true}
        />
      </S.Video>
      <S.ContentWrap>
        <S.SectionInfo>
          <S.Title>
            {city?.name}를 표현할 수 있는
            <br />
            관광지를 소개해드릴게요!
          </S.Title>

          <S.Introduce>
            {city?.name}의 매력을 빠짐없이 느낄 수 있도록
            <br /> 도와주는 셰르파와 함께 여행을 시작하세요.
          </S.Introduce>
        </S.SectionInfo>
        {filterdData?.map((data: Item, index: number) => {
          return (
            <S.ContentItemWrap
              key={index}
              onClick={() => navigate(`/detail/${data?.contentid}`)}
            >
              <CityListItem item={data} />
            </S.ContentItemWrap>
          );
        })}
      </S.ContentWrap>
    </S.Container>
  );
};

export default CityInfoList;
