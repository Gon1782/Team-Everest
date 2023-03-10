// 메인 페이지 테마 배너

// 해시태그 카테고리 타입
export type HashTagCategory =
  | '#이색 체험'
  | '#자연을 찾아 떠나는 자유여행'
  | '#데이트 장소'
  | '#국내에서 즐기는 해외여행';

// 카테고리 선택시 보여지는 리스트 타입
export interface ListItem {
  id: number;
  title: string;
  category: HashTagCategory;
  url: string;
  contentId: number;
}
