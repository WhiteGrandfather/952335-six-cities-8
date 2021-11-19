import {
  datatype,
  internet,
  address,
  image
} from 'faker';
import {UserBackend} from '../types/auth-data';
import {Locations, City, Offer} from '../types/offer-type';
import {FAKE_ARRAY_LENGTH, OfferType} from '../const';
import {AuthInfo} from '../types/state';
import {getRandomInteger} from './utils';

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

const getUser = (): AuthInfo => ({
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

const getRandomOfferTypeKey = (): string => {
  const typeKeys = Object.keys(OfferType);
  return typeKeys[getRandomInteger(0, typeKeys.length - 1)];
};
