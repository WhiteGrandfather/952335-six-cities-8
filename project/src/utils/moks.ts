import {
  datatype,
  internet,
  address,
  image
} from 'faker';
import {UserBackend} from '../types/auth-data';
import {Locations, City, Offer, OfferBackend} from '../types/offer-type';
import {FAKE_ARRAY_LENGTH, OfferType} from '../const';
import {AuthInfo} from '../types/state';
import {getRandomInteger} from './utils';
import {Review} from '../types/review';

export const getUserBackend = (): UserBackend => ({
  'avatar_url': internet.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
  token: datatype.string(),
});

const getLocation = (): Locations => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: 10,
});

export const getCity = (): City => ({
  location: getLocation(),
  name: address.city(),
});

export const getUser = (): AuthInfo => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
});

export const getOffer = (): Offer => ({
  id: datatype.number(),
  bedrooms: datatype.number(),
  city: getCity(),
  description: datatype.string(),
  goods: new Array(FAKE_ARRAY_LENGTH).fill(null).map(datatype.string),
  host: getUser(),
  images: new Array(FAKE_ARRAY_LENGTH).fill(null).map(image.image),
  isFavorite: Boolean(getRandomInteger()),
  isPremium: Boolean(getRandomInteger()),
  location: getLocation(),
  maxAdults: datatype.number(),
  previewImage: datatype.string(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: getRandomOfferTypeKey(),
});

export const getOfferBackend = (): OfferBackend => ({
  id: datatype.number(),
  bedrooms: datatype.number(),
  city: getCity(),
  description: datatype.string(),
  goods: new Array(FAKE_ARRAY_LENGTH).fill(null).map(datatype.string),
  host: getUserBackend(),
  images: new Array(FAKE_ARRAY_LENGTH).fill(null).map(image.image),
  'is_favorite': Boolean(getRandomInteger()),
  'is_premium': Boolean(getRandomInteger()),
  location: getLocation(),
  'max_adults': datatype.number(),
  'preview_image': datatype.string(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: datatype.string(),
});

const getRandomOfferTypeKey = (): string => {
  const typeKeys = Object.keys(OfferType);
  return typeKeys[getRandomInteger(0, typeKeys.length - 1)];
};

export const getReview = (): Review => ({
  id: datatype.number(),
  comment: datatype.string(),
  date: (new Date()).toISOString(),
  rating: datatype.number(5),
  user: getUser(),
});

export const getAuthInfo = (): AuthInfo => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
});

