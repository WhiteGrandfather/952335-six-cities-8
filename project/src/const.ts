export enum AppRoute {
    Login = '/login',
    Property = '/offer/:id?',
    Favorites = '/favorites',
    Root = '/',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum APIRoute {
    Offers = '/hotels',
    Login = '/login',
    Logout = '/logout',
    Favorite = '/favorite',
    Reviews = '/comments'
}

export enum SortBy {
    Default = 'Popular',
    LowPrice = 'Price: low to high',
    HighPrice = 'Price: high to low',
    TopRated = 'Top rated first',
}

export const CITY_LIST: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const FAKE_ARRAY_LENGTH = 3;

export const OfferType: {[key: string]: string} = {
  room: 'Private room',
  house: 'House',
  apartment: 'Apartment',
  hotel: 'Hotel',
} as const;

export const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
