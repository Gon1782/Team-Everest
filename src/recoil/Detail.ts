import { atom } from 'recoil';

export const DetailList = atom({
  key: 'detail',
  default: {
    ratingCount: 0,
    review: [
      {
        rating: 0,
        content: '',
        createdAt: '',
        id: '',
        image: [""],
        title: '',
        uid: '',
      },
    ],
    totalRating: 0,
  },
});
