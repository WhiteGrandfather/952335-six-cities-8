import {
  MutableRefObject,
  useEffect,
  useState
} from 'react';
import {
  Map,
  TileLayer
} from 'leaflet';
import type {City} from '../types/map-type';

const LayerSettings = {
  URL_TEMPLATE: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export default function useMap(
  mapRef:  MutableRefObject<HTMLElement | null>,
  city: City,
): Map | null {

  const [map, setMap] = useState<Map | null>(null);

  useEffect(()=> {
    let instance: Map;

    if (mapRef.current !== null && map === null) {
      instance = new Map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: city.zoom,
      });

      const layer = new TileLayer(LayerSettings.URL_TEMPLATE,{ attribution: LayerSettings.ATTRIBUTION });

      instance.addLayer(layer);

      setMap(instance);
    }
  },[mapRef, map, city]);
  return map;
}
