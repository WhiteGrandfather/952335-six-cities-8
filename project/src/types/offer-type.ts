import {UserBackend} from './auth-data';

export type Locations = {
  latitude: number,
  longitude: number,
  zoom: number,
};

export type City = {
  location: Locations,
  name: string,
}

export type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
};

export type Offer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Locations,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type OfferBackend = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: UserBackend,
  id: number,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: Locations,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
}
