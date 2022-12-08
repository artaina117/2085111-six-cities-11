export const CITIES = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

export const DEFAULT_CITY = CITIES[0];

export const MAX_RATING = 5;

export const MAX_AMOUNT_OF_COMMENTS = 10;

export const TIMEOUT_SHOW_ERROR = 2000;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const sortTypes = {
  POPULAR: 'Popular',
  PRICE_LOW: 'Price: low to high',
  PRICE_HIGH: 'Price: high to low',
  RATING: 'Top rated first',
};

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/{hotelId}',
  NearbyHotel = '/hotels/{hotelId}/nearby',
  Favorite = '/favorite',
  Comments = '/comments/{hotelId}',
  Login = '/login',
  Logout = '/logout',
}
