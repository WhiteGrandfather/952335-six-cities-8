import {Offer} from '../types/offer-type';
import {AuthInfo} from '../types/state';
import {Review} from '../types/review';

export function adapter(item: any | Offer): Offer {
  const {
    bedrooms,
    city,
    description,
    goods,
    host,
    id,
    images,
    location,
    price,
    rating,
    title,
    type,
  } = item;

  return {
    bedrooms,
    city,
    description,
    goods,
    host: {
      avatarUrl: host.avatar_url,
      id: host.id,
      isPro: host.is_pro,
      name: host.name,
    },
    id,
    images,
    isFavorite: item.is_favorite,
    isPremium: item.is_premium,
    location,
    maxAdults: item.max_adults,
    previewImage: item.preview_image,
    price,
    rating,
    title,
    type,
  };
}

export function arrAdapter(array: Offer[]): Offer[] {
  return array.map((item: Offer) =>adapter(item));
}

export function authInfoAdapter(item: any | AuthInfo): AuthInfo {
  const {
    email,
    id,
    name,
  } = item;

  return {
    avatarUrl: item.avatar_url,
    email,
    id,
    isPro: item.is_pro,
    name,
  };
}

export function reviewAdapter(review: Review | any): Review {
  const {
    comment,
    date,
    id,
    rating,
    user,
  } = review;

  return {
    comment,
    date,
    id,
    rating,
    user: {
      avatarUrl: user.avatar_url,
      id: user.id,
      isPro: user.is_pro,
      name: user.name,
    },
  };
}

export function reviewArrAdapter(reviewArr: Review[]): Review[] {
  return reviewArr.map((item: Review) =>reviewAdapter(item));
}
