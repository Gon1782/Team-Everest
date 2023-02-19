// 모달창 선택자
export const modalSelector = (
  type: string,
  reviewContent: string,
  reviewImg: string[],
  reviewRating: number,
) => {
  switch (true) {
    case type === 'post':
      return {
        content: '',
        image: [],
        rating: 0,
        clicked: [false, false, false, false, false],
      };
    case type === 'edit':
      return {
        content: reviewContent,
        image: reviewImg,
        rating: reviewRating,
        clicked: [false, false, false, false, false].map((_, i) =>
          i < reviewRating ? true : false,
        ),
      };
    default:
      return {
        content: '',
        image: [],
        rating: 0,
        clicked: [false, false, false, false, false],
      }
  }
};
