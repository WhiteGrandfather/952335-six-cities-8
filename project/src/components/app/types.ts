import {Offer} from '../../types/offer-type';

export type AppProps = {
  Offers: Offer[],
}

export type FavoritesListProps = {
  favName: string,
  favList: Offer[],
}

export type loggedType = boolean;
