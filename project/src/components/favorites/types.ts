import {Offer} from '../../types/offer-type';

export type FavoritesProps = {
  favoritesList: {
    favName: string,
    favList: Offer[]
  }[]
}
