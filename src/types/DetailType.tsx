export interface DetailResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: { item: Item[] };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export interface Item {
  [x: string]: string;
}

export interface Reviews {
  ratingCount: number;
  review: EachReview[];
  totalRating: number;
  tagCount: { name: string; count: number }[];
  areacode: string;
  sigungucode: string;
}

export interface EachReview {
  rating: number;
  content: string;
  createdAt: string;
  id: string;
  image: string[];
  contentId: string;
  uid: string;
  isDelete: string;
  tag: string[];
}

export interface Document {
  [x: string]: any;
}
