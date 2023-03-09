import { DetailResponse } from '@/types/DetailType';
import axios from 'axios';

const baseURL = (type: string, num: number, pageNum: number) => {
  return `https://apis.data.go.kr/B551011/KorService/${type}?numOfRows=${num}&pageNo=${pageNum}&_type=json&MobileOS=ETC&MobileApp=Test&ServiceKey=${process.env.API_KEY}`;
};

export const getDetail = async (id?: string) => {
  const SERVER_URL = baseURL('detailCommon', 1, 1);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&contentId=${id}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`,
  );
  return data;
};

export const getDetailIntro = async (id?: string) => {
  const SERVER_URL = baseURL('detailIntro', 1, 1);

  const contentTypeId = id?.slice(0, 2);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&contentId=${id}&contentTypeId=${contentTypeId}`,
  );
  return data;
};

export const getSimilar = async (pageNo: number, cat: string) => {
  const SERVER_URL = baseURL('areaBasedList', 4, pageNo);

  const cat1 = cat.slice(0, 3);
  const cat2 = cat.slice(0, 5);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&listYN=Y&arrange=C&contentTypeId=&areaCode=&sigunguCode=&cat1=${cat1}&cat2=${cat2}&cat3=${cat}`,
  );
  return data;
};

export const getAmusement = async (
  areaCode: string,
  sigunguCode: string = '',
  pageNo: number = 1,
) => {
  const SERVER_URL = baseURL('areaBasedList', 14, pageNo);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&listYN=Y&arrange=Q&contentTypeId=&areaCode=${areaCode}&sigunguCode=${sigunguCode}&cat1=A03&cat2=&cat3=`,
  );
  return data;
};

export const getMichelin = async (
  areaCode: string,
  sigunguCode: string = '',
  pageNo: number = 1,
) => {
  const SERVER_URL = baseURL('areaBasedList', 4, pageNo);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&listYN=Y&arrange=Q&contentTypeId=&areaCode=${areaCode}&sigunguCode=${sigunguCode}&cat1=A05&cat2=&cat3=`,
  );
  return data;
};

export const getTourList = async (
  pickLocation: string,
  pickTheme: string,
  pageNo: number,
) => {
  const SERVER_URL = baseURL('areaBasedList', 24, pageNo);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&listYN=Y&arrange=A&contentTypeId=${pickTheme}&areaCode=${pickLocation}&sigunguCode=&cat1=&cat2=&cat3=&_type=json`,
  );

  return data;
};

export const getCityTourInfo = async (
  areacode: string,
  sigunguCode: string = '',
  pageNo: number = 1,
) => {
  const SERVER_URL = baseURL('areaBasedList', 5, pageNo);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&listYN=Y&arrange=Q&contentTypeId=12&areaCode=${areacode}&sigunguCode=${sigunguCode}&cat1=&cat2=&cat3=`,
  );

  return data;
};

export const getSpot = async (
  spotName: string,
  num: number,
  pageNo: number,
) => {
  const SERVER_URL = baseURL('searchKeyword', num, pageNo);

  const { data } = await axios.get<DetailResponse>(
    `${SERVER_URL}&listYN=Y&keyword=${spotName}`,
  );

  return data;
};
