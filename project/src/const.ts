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
}
