import React, {
  useEffect,
  useRef
} from 'react';
import useMap from '../../hooks/useMap';
import type {MapProps} from './type';
import {
  Icon,
  Marker
} from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({
  city,
  points,
  onHoverId,
}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            onHoverId !== null && point.id === onHoverId
              ? currentCustomIcon
              : defaultCustomIcon)
          .addTo(map);
      });
    }
    return () => markers.forEach((marker) => marker.remove());
  });

  useEffect(() => {
    const {latitude, longitude} = city;
    map?.setView([latitude, longitude]);
  });

  return (
    <div style={{height: '100%'}}
      ref={mapRef}
      data-testid="map"
    >
    </div>
  );
}

export default Map;
