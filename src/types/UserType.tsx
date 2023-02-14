import { EachReview } from './DetailType';

export interface UserData {
  displayName: string;
  email: string;
  MyReview: EachReview[];
  photoURL: string;
  uid: string;
}

export interface MyPlanner {
  addr: string;
  duration: string;
  lat: string;
  lng: string;
  number: number;
  title: string;
}
