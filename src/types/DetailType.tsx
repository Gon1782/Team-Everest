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
}

export interface EachReview {
  rating: number;
  content: string;
  createdAt: string;
  id: string;
  image: string[];
  title: string;
  contentId: string;
  uid: string;
  isDelete: string;
}

export interface Document {
  [x: string]: any;
}
