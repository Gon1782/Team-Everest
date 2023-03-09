import { atom } from 'recoil';
import { Reviews } from '@/types/DetailType';

export const DetailList = atom<Reviews>({
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
