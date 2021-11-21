import {Rating} from '../const';

export const getRandomInteger = (min = 0, max = 1): number => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getWidthByRating = (rating: number): number => (Math.min(rating * Rating.RATING_MULTIPLIER, Rating.MAX_RATING_PERCENT));
