import {Review} from '../../types/review';

export type maxId = number;

export type ReviewsListProps = {
  onReviewSubmit: any,
  ReviewsList: Review[],
  isLoggedIn: boolean
}
