import type {Host} from './offer-type';

export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Host,
};

export type ReviewPost = {
  comment: string,
  rating: number,
};
