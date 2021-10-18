import {Offer} from '../../types/offer-type';

export type PrivetRouteProps = {
  isLoggedIn: boolean,
  favoritesList: {
    favName: string,
    favList: Offer[],
  }[],
}
