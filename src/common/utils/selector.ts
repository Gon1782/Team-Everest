import { useNavigate } from 'react-router-dom';
import { Do, oneCity } from './areaCode/areaCode';
import { areaCode31 } from './areaCode/areaCode31';
import { areaCode32 } from './areaCode/areaCode32';
import { areaCode33 } from './areaCode/areaCode33';
import { areaCode34 } from './areaCode/areaCode34';
import { areaCode35 } from './areaCode/areaCode35';
import { areaCode36 } from './areaCode/areaCode36';
import { areaCode37 } from './areaCode/areaCode37';
import { areaCode38 } from './areaCode/areaCode38';
import * as tag from './tags';

// 모달창 선택자
export const modalSelector = (
  type: string,
  reviewContent: string,
  reviewImg: string[],
  reviewRating: number,
  reviewTag: string[],
) => {
  switch (true) {
    case type === 'post':
      return {
        content: '',
        image: [],
        rating: 0,
        clicked: [false, false, false, false, false],
        tags: [],
      };
    case type === 'edit':
      return {
        content: reviewContent,
        image: reviewImg,
        rating: reviewRating,
        clicked: [false, false, false, false, false].map((_, i) =>
          i < reviewRating ? true : false,
        ),
        tags: reviewTag,
      };
    default:
      return {
        content: '',
        image: [],
        rating: 0,
        clicked: [false, false, false, false, false],
        tags: [],
      };
  }
};

// 회원가입 선택자
export const registerSelector = (name: string, dupCheck: boolean) => {
  switch (true) {
    case name === 'email':
      return {
        title: 'E-Mail',
        info: '영문, 숫자로 이루어진 이메일을 입력해주세요.',
        warning: '※ 이메일 형식에 맞게 입력해주세요.',
        checkUse: dupCheck
          ? '사용가능한 이메일입니다.'
          : '중복된 이메일입니다.',
        tabIndex: 1,
      };
    case name === 'nickname':
      return {
        title: 'Nickname',
        info: '특수문자를 제외한 9글자 미만의 닉네임을 설정해 주세요.',
        warning: '※ 닉네임이 너무 길어요.',
        checkUse: dupCheck
          ? '사용가능한 닉네임입니다.'
          : '중복된 닉네임입니다.',
        tabIndex: 4,
      };
    default:
      return {
        title: '',
        info: '',
        warning: '',
        checkUse: '',
      };
  }
};

// 리뷰
// 지역
export const areaSelector = (areacode: string, sigungucode: string) => {
  switch (true) {
    case oneCity.includes(areacode):
      return [areacode, ''];
    case Do.includes(areacode):
      return [areacode, sigungucode];
    default:
      return ['', ''];
  }
};

// 태그
export const tagSelector = (categoryCode: string) => {
  const bigCategory = categoryCode.slice(0, 3);
  switch (true) {
    case bigCategory === 'A01' || categoryCode === 'A0202':
      return tag.nature;
    case categoryCode === 'A0201':
      return tag.history;
    case categoryCode === 'A0203':
      return tag.experience;
    case categoryCode === 'A0204':
      return tag.industry;
    case categoryCode === 'A0205':
      return tag.building;
    case categoryCode === 'A0206' || categoryCode === 'A0208':
      return tag.culture;
    case categoryCode === 'A0207':
      return tag.festival;
    case bigCategory === 'C01':
      return tag.course;
    case bigCategory === 'A03':
      return tag.leisure;
    case bigCategory === 'B02':
      return tag.accomodation;
    case bigCategory === 'A04':
      return tag.shoping;
    case bigCategory === 'A05':
      return tag.michelin;
    default:
      return [];
  }
};

// 지도페이지
// 마커
export const markerSelector = (areaCode: string) => {
  switch (true) {
    case areaCode === '31':
      return areaCode31;
    case areaCode === '32':
      return areaCode32;
    case areaCode === '33':
      return areaCode33;
    case areaCode === '34':
      return areaCode34;
    case areaCode === '35':
      return areaCode35;
    case areaCode === '36':
      return areaCode36;
    case areaCode === '37':
      return areaCode37;
    case areaCode === '38':
      return areaCode38;
    default:
      return []
  }
};

// 사이드바
export const sideMenuSelector = (areacode: string, fn: () => void) => {
  const navigate = useNavigate()
    switch (true) {
      case oneCity.includes(areacode):
        return {
          type: "Do",
          text: '홈으로 이동',
          onClick: () => navigate('/main'),
        };
      case Do.includes(areacode):
        return {
          type: "sigungu",
          text: '뒤로 가기',
          onClick: () => fn(),
        };
      default:
        return {
          type: "Do",
          text: '홈으로 이동',
          onClick: () => navigate('/main'),
        };
    }
  };
