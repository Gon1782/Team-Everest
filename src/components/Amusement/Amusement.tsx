import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import { getAmusement } from '@/common/api/tourApi';
import { City } from '@/types/CityType';
import { DetailResponse } from '@/types/DetailType';
import AmusementInfoBox from './AmusementInfoBox';
import * as S from './style/AmusementStyled';
import Error from '../Common/Error';

interface Props {
  city: City;
}

const Amusement = ({ city }: Props) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error, refetch } = useQuery<
    DetailResponse,
    Error
  >('amusement', () => getAmusement(city.areaCode, city.sigunguCode));

  useEffect(() => {
    queryClient.removeQueries('amusement');
    refetch();
  }, [city]);

  if (isLoading)
    return (
      <S.AmusementInfoContainer>
        <S.AmusementInfoHeader>
          <S.AmusementInfoSubHeader>
            다양한 경험을 할 수 있도록,
          </S.AmusementInfoSubHeader>
          <S.AmusementInfoTitle>
            {city.name}에서 할 수 있는
            <br />
            활동을 소개할게요 !
          </S.AmusementInfoTitle>
        </S.AmusementInfoHeader>
      </S.AmusementInfoContainer>
    );
  if (isError) return <div>에러: {error.message}</div>;

  if (!data?.response) return <Error />;

  const detailList = data?.response.body.items.item;

  return (
    <S.AmusementInfoContainer>
      <S.AmusementInfoHeader>
        <S.AmusementInfoSubHeader>
          다양한 경험을 할 수 있도록,
        </S.AmusementInfoSubHeader>
        <S.AmusementInfoTitle>
          {city.name}에서 할 수 있는
          <br />
          활동을 소개할게요 !
        </S.AmusementInfoTitle>
      </S.AmusementInfoHeader>
      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        navigation={true}
        grabCursor={true}
        centeredSlides={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          depth: 0,
        }}
        loop={!!detailList && detailList.length >= 14 ? true : false}
        spaceBetween={70}
        slidesPerView={'auto'}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        style={{ height: 450, borderRadius: 30, marginBottom: 80 }}
        speed={1500}
      >
        {detailList?.map((x) => {
          return (
            <S.SwiperSlideStyle key={x.contentid}>
              <AmusementInfoBox item={x} />
            </S.SwiperSlideStyle>
          );
        })}
      </Swiper>
    </S.AmusementInfoContainer>
  );
};

export default Amusement;
