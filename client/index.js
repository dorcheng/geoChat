import { MAPBOX_ACCESS_TOKEN } from '../config';
import mapboxgl from 'mapbox-gl';

// instantiate map

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export const map = new mapboxgl.Map({
  container: 'map-canvas',
  center: [-74.0, 40.7],
  zoom: 12.3,
  pitch: 35,
  bearing: 20,
  style: 'mapbox://styles/mapbox/dark-v9'
});
