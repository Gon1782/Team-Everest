import { EachReview, Item } from './DetailType';

export interface UserData {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  introduce: string;
  backImage: string;
  myWishPlace: Item[];
  myPlanner: Item[];
  MyReview: EachReview[];
}

export interface MyPlanner {
  addr: string;
  duration: string;
  lat: string;
  lng: string;
  number: number;
  title: string;
}
