import mapboxgl from 'mapbox-gl';

export const buildMarker = (coords) => {
  const markerEl = document.createElement('div');
  markerEl.style.backgroundSize = 'contain';
  markerEl.style.width = '32px';
  markerEl.style.height = '37px';
  markerEl.style.backgroundImage = `url("http://i.imgur.com/WbMOfMl.png")`;
  return new mapboxgl.Marker(markerEl).setLngLat(coords);
};
