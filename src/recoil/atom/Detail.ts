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
        image: [''],
        uid: '',
        isDelete: '',
        contentId: '',
        tag: [''],
      },
    ],
    tagCount: [{ name: '', count: 0 }],
    totalRating: 0,
    areacode: '',
    sigungucode: '',
  },
});
