import {City, Points} from '../../types/map-type';

export type MapProps = {
  city: City,
  points: Points,
  onHoverId: number | null,
};
