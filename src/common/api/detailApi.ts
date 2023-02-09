import { DetailResponse } from '@/types/DetailType';
import axios from 'axios';

const BASE_URL = `https://apis.data.go.kr/B551011/KorService/detailCommon?numOfRows=1&pageNo=1&_type=json&MobileOS=ETC&MobileApp=Test&ServiceKey=${process.env.API_KEY}`

export const getDetail = async (id?: string) => {
  const { data } = await axios.get<DetailResponse>(`${BASE_URL}&contentId=${id}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`);
  return data;
};
