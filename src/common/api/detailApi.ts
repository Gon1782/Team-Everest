import { DetailResponse } from '@/types/DetailType';
import axios from 'axios';

const BASE_URL = (type: string, num: number, pageNum: number) => {
  return `https://apis.data.go.kr/B551011/KorService/${type}?numOfRows=${num}&pageNo=${pageNum}&_type=json&MobileOS=ETC&MobileApp=Test&ServiceKey=${process.env.API_KEY}`;
};

export const getDetail = async (id?: string) => {
  const { data } = await axios.get<DetailResponse>(
    `${BASE_URL(
      'detailCommon',
      1,
      1,
    )}&contentId=${id}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`,
  );
  return data;
};

export const getDetailIntro = async (id?: string) => {
  const contentTypeId = id?.slice(0, 2);
  const { data } = await axios.get<DetailResponse>(
    `${BASE_URL(
      'detailIntro',
      1,
      1,
    )}&contentId=${id}&contentTypeId=${contentTypeId}`,
  );
  return data;
};

export const getSimilar = async (pageNo: number, cat: string) => {
  const cat1 = cat.slice(0, 3);
  const cat2 = cat.slice(0, 5);
  const { data } = await axios.get<DetailResponse>(
    `${BASE_URL(
      'areaBasedList',
      4,
      pageNo,
    )}&listYN=Y&arrange=A&contentTypeId=&areaCode=&sigunguCode=&cat1=${cat1}&cat2=${cat2}&cat3=${cat}`,
  );
  return data;
};

export const getTourList = async (
  pickLocation: string,
  pickTheme: string,
  pageNo: string,
) => {
  const { data } = await axios.get<DetailResponse>(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=h8KR%2BEmY3pofSJxtRE2zYr0i90MhTWIBn3LT8ffM1QHexnPGhkppmh3QtBtT76cMnYgj4n3HE76WvYb2UHbChA%3D%3D&listYN=Y&arrange=A&contentTypeId=${pickTheme}&areaCode=${pickLocation}&sigunguCode=&cat1=&cat2=&cat3=&_type=json`,
  );

  return data;
};
