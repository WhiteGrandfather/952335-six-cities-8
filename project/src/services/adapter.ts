import {Offer} from '../types/offer-type';

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
